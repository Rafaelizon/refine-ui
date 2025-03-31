import { http } from '@/services/http'
import type { Cart } from '@/types/cart.type'
import type { OrderItemRequest } from '@/types/order.item.request.type'
import type { OrderItem } from '@/types/order.item.type'
import type { Product } from '@/types/product.type'
import type { ServerError } from '@/types/server-error.type'
import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useAuthStore } from './auth.store'
import { useModalStore } from './modal.store'
import { useScaleStore } from './scale.store'
import { useScheduleStore } from './schedule.store'
import { useSelfServiceOrderStore } from './self-service-order-store'

export const useCartStore = defineStore('cart', () => {
  const CART_ENDPOINT = '/cart/calculate'
  const PRODUCTS_ENDPOINT = '/products'

  const cart = ref<Cart>({
    items: [],
    discount: 0,
    finalPrice: 0,
    originalPrice: 0,
    discountedPrice: 0,
  })

  const state = reactive({ loading: false, error: false })
  const valid = computed(() => cart.value.items.length >= 1)

  const authStore = useAuthStore()
  const modalStore = useModalStore()
  const orderStore = useSelfServiceOrderStore()
  const scaleStore = useScaleStore()
  const scheduleStore = useScheduleStore()

  const weight = computed(() => scaleStore.weight)
  const client = computed(() => orderStore.client)
  const store = computed(() => authStore.user?.store)
  const atendimento = computed(() => scheduleStore.current)

  const itemsRequest = ref<OrderItemRequest[]>([])

  const isCartValid = computed(
    () =>
      atendimento.value &&
      client.value &&
      atendimento.value.id !== 0 &&
      client.value.credential.length &&
      itemsRequest.value.length >= 1,
  )

  watch(
    itemsRequest,
    () => {
      if (!isCartValid.value) {
        if (!itemsRequest.value.length) {
          resetCart()
          return
        }
      }

      calculateCartPrice()
    },
    { deep: true },
  )

  const addItem = (code: string) => {
    const orderItem = cart.value.items.find((item) => item.product.code === code)
    if (orderItem) {
      handleSameProduct(orderItem)
      return
    }

    handleNewProduct(code)
  }

  const removeItem = (code: string) => {
    const index = itemsRequest.value.findIndex((item) => item.productCode === code)
    if (index === -1) return

    const item = itemsRequest.value[index]

    item.quantity > 1 ? item.quantity-- : itemsRequest.value.splice(index, 1)
  }

  const handleSameProduct = (orderItem: OrderItem) => {
    if (!orderItem.product.allowMultiple) {
      modalStore.error(
        'Erro ao adicionar produto',
        'Esse produto não pode ser adicionado mais de uma vez ao carrinho.',
      )
      return
    }

    const index = itemsRequest.value.findIndex(
      (request) => request.productCode === orderItem.product.code,
    )
    if (index !== -1) {
      itemsRequest.value[index].quantity += 1
    }
  }

  const handleNewProduct = (code: string) => {
    request()
    setTimeout(async () => {
      try {
        const res = await http.get(`${PRODUCTS_ENDPOINT}/${code}`)
        if (res.data.priceType === 'PRICE_PER_KG') {
          handleProductPricePerKg(res.data)
          return
        }

        itemsRequest.value.push({
          productCode: res.data.code,
          quantity: 1,
        })
      } catch (e) {
        console.log(e)
        modalStore.error(
          'Erro ao adicionar produto',
          `Produto não encontrado para o código: ${code}`,
        )
      } finally {
        state.loading = false
      }
    }, 250)
  }

  const handleProductPricePerKg = async (product: Product) => {
    await scaleStore.read()
    if (!weight.value) {
      return
    }

    itemsRequest.value.push({
      productCode: product.code,
      quantity: 1,
      weight: weight.value,
    })
  }

  const calculateCartPrice = () => {
    request()
    setTimeout(() => {
      http
        .post(`${CART_ENDPOINT}`, {
          credential: client.value?.credential,
          atendimentoId: atendimento.value?.id,
          storeId: store.value?.id,
          items: itemsRequest.value,
        })
        .then((res) => {
          cart.value = res.data
        })
        .catch((e: AxiosError) => {
          handleCalculateErrors(e.response?.data as ServerError)
        })
        .finally(() => (state.loading = false))
    }, 250)
  }

  const handleCalculateErrors = (error: ServerError) => {
    const baseTitle = 'Erro ao calcular o preço do carrinho'
    const baseMessage = error.message

    if (error.error === 'CREDENTIAL_RANGE_NOT_FOUND') {
      modalStore.error(
        baseTitle,
        'Credencial Range não encontrada para esse crachá, favor contatar área especializada.',
      )
      reset()
      orderStore.reset()
      return
    }

    if (error.error === 'BALANCE_LIMIT_REACHED') {
      modalStore.error(
        'Limite de saldo negativo atingido',
        'Essa compra faria com que seu saldo atingisse o limite de saldo negativo de  <span class="text-nowrap font-semibold">-R$ 100,00</span>, e por isso foi negada. <br/> Favor contate a tesouraria.',
      )
      console.log(cart.value)
      console.log(itemsRequest.value)

      return
    }

    modalStore.error(baseTitle, baseMessage)
  }

  const submitCart = () => {
    if (!client.value || !atendimento.value || !store.value) {
      return
    }

    orderStore.createOrder({
      atendimentoId: atendimento.value.id,
      storeId: store.value.id,
      credential: client.value.credential,
      items: itemsRequest.value,
    })
  }

  const resetCart = () => {
    cart.value = {
      items: [],
      discount: 0,
      finalPrice: 0,
      originalPrice: 0,
      discountedPrice: 0,
    }
  }

  const reset = () => {
    resetCart()
    itemsRequest.value = []
  }

  const request = () => {
    state.error = false
    state.loading = true
  }

  return { cart, state, valid, reset, addItem, removeItem, submitCart }
})
