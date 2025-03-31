<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store';
import { useScaleStore } from '@/stores/scale.store';
import { useSelfServiceOrderStore } from '@/stores/self-service-order-store';
import { toCurrency } from '@/utils/currency';
import { formatWeight } from '@/utils/decimal';
import { computed, ref } from 'vue';
import Button from '../Button.vue';
import Card from '../card/Card.vue';
import Divider from '../Divider.vue';
import Icon from '../Icon.vue';
import Modal from '../modal/Modal.vue';

const cartStore = useCartStore();
const scaleStore = useScaleStore();
const orderStore = useSelfServiceOrderStore();
const weight = computed(() => scaleStore.weight);
const cart = computed(() => cartStore.cart)

const showPriceInfoModal = ref(false);
const openPriceInfoModal = () => showPriceInfoModal.value = true;
const closePriceInfoModal = () => showPriceInfoModal.value = false;

type PricingItem = {
  title: string,
  body: string,
  show?: boolean
}

const pricingItems = computed<PricingItem[]>(() => [
  { title: 'Subtotal', body: toCurrency(cart.value.originalPrice, { suffix: true }) },
  { title: 'Desconto', body: `<span class="text-teal-500">-${toCurrency(cart.value.discountedPrice, { suffix: true })}</span>` },
  { title: 'Total', body: toCurrency(cart.value.finalPrice, { suffix: true }) }
])

</script>

<template>
  <Card>
    <template #cardTitleIcon>
      <Icon icon="fa-receipt" class="text-sky-600" />
    </template>
    <template #cardTitle>
      <div class="flex items-center justify-between w-full">
        <p>Precificação</p>
        <Button v-if="cartStore.valid" variant="secondary" :class="{ '-my-2 -mx-2': cartStore.valid }"
          :click="() => openPriceInfoModal()">
          <Icon icon="fa-question" />
        </Button>
      </div>
    </template>
    <template #cardBody>
      <section v-if="cart.items.length"
        class="flex items-center justify-between divide-x divide-dashed divide-zinc-200 dark:divide-zinc-100/10">
        <div class="px-4 first:ps-0 last:pe-0 last:ms-auto" v-for="item in pricingItems" :key="item.title">
          <p class="text-sm">{{ item.title }}</p>
          <p class="text-2xl" v-html="item.body"></p>
        </div>
      </section>
    </template>

  </Card>
  <Modal :show="showPriceInfoModal" title="Detalhes" @on-close="closePriceInfoModal()">
    <div class="divide-dashed divide-zinc-200 dark:divide-zinc-100/10">
      <section class="flex flex-col gap-2 pb-4">
        <p>Produtos</p>
        <ul>
          <li v-for="item in cart.items" :key="item.id" class="px-4 py-1.5 odd:bg-slate-100 dark:odd:bg-slate-100/10">
            <div class="flex items-center justify-between text-sm">
              <p class="font-light">{{ item.product.name }}</p>
              <div class="flex items-center divide-x divide-dashed divide-zinc-200 dark:divide-zinc-100/10">
                <div class="pe-4">
                  <p class="text-[11px] font-light">
                    {{ item.product.priceType === 'PRICE_PER_KG' ? 'Preço Kg' : 'PreçoUn.' }}
                  </p>
                  <p>R${{ toCurrency(item.unitPrice) }}</p>
                </div>

                <div class="px-4" v-if="item.product.priceType === 'PRICE_PER_KG'">
                  <p class="text-[11px] font-light">Peso</p>
                  <p>{{ formatWeight(weight) }}kg</p>
                </div>

                <div class="px-4" v-else>
                  <p class="text-[11px] font-light">Qnt.</p>
                  <p>x {{ item.quantity }}</p>
                </div>
                <div class="ps-4">
                  <p class="text-[11px] font-light">Subtotal</p>
                  <p>R${{ toCurrency(item.totalPrice) }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <Divider />
      <section class="flex flex-col gap-2 py-4">
        <p>Precificação</p>
        <ul class="flex flex-col gap-2">
          <li class="flex items-center justify-between text-sm">
            <p>Subtotal:</p>
            <p>R${{ toCurrency(cart.originalPrice) }}</p>
          </li>
          <li class="flex items-center justify-between text-sm">
            <p>Desconto:</p>
            <p class="text-teal-500">- R${{ toCurrency(cart.discountedPrice) }}</p>
          </li>
          <li class="flex items-center justify-between text-sm">
            <p>Subsídio:</p>
            <p>{{ cart.discount }}%</p>
          </li>
          <li class="flex items-center justify-between text-sm">
            <p>Cliente Isento? (SND - Produção):</p>
            <Icon :icon="orderStore.client?.freeOfCharge ? 'check-circle' : 'xmark-circle'"
              :class="orderStore.client?.freeOfCharge ? 'text-teal-500' : 'text-rose-500'" />

          </li>
        </ul>
      </section>
      <Divider />
      <section class="pt-4">
        <li class="text-base flex items-center justify-between">
          <p class="text-teal-500">Total à pagar:</p>
          <p>R${{ toCurrency(cart.finalPrice) }}</p>
        </li>
      </section>
    </div>
  </Modal>

</template>
