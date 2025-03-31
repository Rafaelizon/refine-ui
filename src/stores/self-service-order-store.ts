import { http } from '@/services/http'
import type { Client } from '@/types/client.type'
import type { OrderRequest } from '@/types/order.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useCartStore } from './cart.store'
import { useMandatoryProductsStore } from './mandatory-products.store'
import { useModalStore } from './modal.store'
import { useScheduleStore } from './schedule.store'
import type { AxiosError } from 'axios'
import type { ServerError } from '@/types/server-error.type'
import { toCurrency } from '@/utils/currency'

export const useSelfServiceOrderStore = defineStore('self-service-order', () => {
  const ORDER_ENDPOINT = '/orders'
  const CLIENT_ENDPOINT = '/clients'

  const client = ref<Client>()
  const atendimento = computed(() => scheduleStore.current)

  const cartStore = useCartStore()
  const modalStore = useModalStore()
  const scheduleStore = useScheduleStore()
  const mandatoryProductStore = useMandatoryProductsStore()

  const state = reactive({ loading: false, error: false, success: false })
  const orderNumber = ref<string>('')

  const openOrder = (credential: string) => {
    request()
    setTimeout(() => {
      http
        .get(`${CLIENT_ENDPOINT}/${credential}`)
        .then((res) => {
          client.value = res.data
          if (client.value) {
            if (client.value.balance !== undefined && client.value.balance <= -100) {
              modalStore.error(
                'Erro ao abrir comanda',
                `Seu saldo atingiu o limite de <strong>-R$ 100,00</strong>, (${toCurrency(client.value.balance, { suffix: true })}) e por isso sua conta está <strong>suspensa</strong> de abrir comandas. <br/> Favor contate a tesouraria.`,
              )
              reset()
              return
            }

            handleOrderOpened()
          }
        })
        .catch((e) => {
          console.error(e)
          state.error = true
          modalStore.error(
            'Erro ao abrir a comanda.',
            'Verifique se o crachá foi lido corretamente e tente novamente.',
          )
        })
        .finally(() => (state.loading = false))
    }, 250)
  }

  const createOrder = (orderRequest: OrderRequest) => {
    request()
    setTimeout(() => {
      http
        .post(ORDER_ENDPOINT, orderRequest)
        .then((res) => handleOrderCreated(res.data.number))
        .catch((e: AxiosError) => {
          handleOrderErrors(e.response?.data as ServerError)
        })
        .finally(() => (state.loading = false))
    }, 250)
  }

  const handleOrderOpened = async () => {
    if (!atendimento.value) return

    await mandatoryProductStore.getMandatoryProductsForAtendimento(atendimento.value.id)
    if (mandatoryProductStore.products && mandatoryProductStore.products.length) {
      mandatoryProductStore.products.forEach((product) => {
        cartStore.addItem(product.code)
      })
    }
  }

  const handleOrderCreated = (number: string) => {
    modalStore.success('Pedido confirmado', `n.: ${number}`, { autoclose: true })
    reset()
    cartStore.reset()
    mandatoryProductStore.reset()
  }

  const handleOrderErrors = (error: ServerError) => {
    if (error.error === 'BALANCE_LIMIT_REACHED') {
      modalStore.error(
        'Limite de saldo negativo atingido',
        'Seu saldo não pode ser menor do que o limite de <span class="text-nowrap font-semibold">-R$ 100,00.</span> Favor contate a tesouraria.',
      )
      return
    }

    modalStore.error('Erro ao criar pedido', error.message)
  }

  const request = () => {
    state.loading = true
    state.error = false
    state.success = false
  }

  const reset = () => {
    state.loading = false
    state.error = false
    state.success = false
    client.value = undefined
  }

  return { state, reset, openOrder, createOrder, orderNumber, client }
})
