<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store';
import { useModalStore } from '@/stores/modal.store';
import { useSelfServiceOrderStore } from '@/stores/self-service-order-store';
import { useScaleStore } from '@/stores/scale.store';
import { useScheduleStore } from '@/stores/schedule.store';
import { useToggle } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import Button from '../Button.vue';
import Card from '../card/Card.vue';
import Input from '../forms/fields/Input.vue';
import Icon from '../Icon.vue';
import Modal from '../modal/Modal.vue';
import Divider from '../Divider.vue';
import { toCurrency } from '@/utils/currency';

const reader = ref<string>('');

const cartStore = useCartStore();
const modalStore = useModalStore();
const scaleStore = useScaleStore();
const scheduleStore = useScheduleStore();
const orderStore = useSelfServiceOrderStore();

const weight = computed(() => scaleStore.weight);
const client = computed(() => orderStore.client);
const currentAtendimento = computed(() => scheduleStore.current);

const resetModalOpen = ref<boolean>(false);
const toggleResetModal = useToggle(resetModalOpen);

const confirmOderModalOpen = ref<boolean>(false);
const toggleConfirmOrderModal = useToggle(confirmOderModalOpen);

const negativeBalanceModalOpen = ref<boolean>(false);
const toggleNegativeBalanceModalOpen = useToggle(negativeBalanceModalOpen);

const reset = () => {
  cartStore.reset();
  orderStore.reset();
  scaleStore.reset()
  toggleResetModal();
  modalStore.success('Atendimento cancelado', 'Seu atendimento foi cancelado com sucesso.', { autoclose: true });
}

const clearReader = () => {
  reader.value = '';
};

const canCreate = () => {
  return scheduleStore.schedule && client.value && cartStore.valid;
}

const validateReaderInput = () => {
  return reader.value && reader.value.trim().length
}

const openNewOrder = () => {
  orderStore.openOrder(reader.value);
  clearReader();
}

const handleConfirm = () => {
  clearReader();

  if (!cartStore.valid) {
    modalStore.error('Erro ao tentar confirmar', 'Adicione pelo menos um produto no carrinho antes de confirmar.')
    return;
  }

  if (client.value && client.value.balance !== undefined && client.value.balance - cartStore.cart.finalPrice < 0) {
    toggleNegativeBalanceModalOpen();
    return;
  }

  createOrder();
}

const handleReaderSubmit = () => {
  if (!validateReaderInput()) return;

  if (!client.value) {
    openNewOrder();
    return;
  }

  if (reader.value === client.value.credential) {
    handleConfirm();
    return;
  }

  cartStore.addItem(reader.value);
  clearReader();
}

const createOrder = () => {
  cartStore.submitCart();
}

const createOrderFromButton = () => {
  toggleConfirmOrderModal();
  if (client.value && client.value.balance !== undefined && client.value.balance - cartStore.cart.finalPrice < 0) {
    toggleNegativeBalanceModalOpen();
    return;
  }
  createOrder();
}

const createOrderFromBalanceModal = () => {
  toggleNegativeBalanceModalOpen();
  createOrder();
}

const barcodeInput = ref<{ inputRef: HTMLInputElement }>();

const focusInput = () => {
  if (barcodeInput.value?.inputRef) {
    barcodeInput.value.inputRef.focus();
  }
};

const handleBlur = () => {
  setTimeout(() => focusInput(), 100);
};

onMounted(() => {
  focusInput();
  document.addEventListener('click', focusInput);
});

</script>

<template>
  <section>
    <Card class="mt-auto">
      <template #cardTitleIcon>
        <Icon icon="fa-barcode" class="text-sky-600" />
      </template>
      <template #cardTitle>Leitor do código de barras</template>
      <template #cardBody>
        <form @submit.prevent="handleReaderSubmit">
          <Input id="barcode" ref="barcodeInput" v-model="reader" :blur="handleBlur" size="large"
            :disabled="!currentAtendimento" required />
        </form>
      </template>
    </Card>
    <section class="grid gap-4 btn-columns mt-4" v-if="client">
      <Button :click="() => toggleConfirmOrderModal()" variant="success" class="flex-col w-full" v-if="canCreate()">
        <Icon icon="fa-check" />
        <p>Confirmar</p>
      </Button>
      <Button :click="() => toggleResetModal()" variant="danger" class="flex-col w-full">
        <Icon icon="fa-arrow-rotate-left" />
        <p>Reiniciar</p>
      </Button>
    </section>

    <Modal :show="resetModalOpen" @on-close="() => resetModalOpen = false" @on-confirm="reset"
      title="Cancelar o atendimento?" action-buttons cancel-text="Voltar" confirm-text="Sim">
      <p>Tem certeza que deseja cancelar o atendimento?</p>
    </Modal>

    <Modal :show="confirmOderModalOpen" @on-close="() => confirmOderModalOpen = false"
      @on-confirm="createOrderFromButton" title="Confirmar pedido?" action-buttons>
      <p>Tem certeza que deseja confirmar o pedido?</p>
    </Modal>

    <Modal :show="negativeBalanceModalOpen"
      :title="client?.balance! < 0 ? 'Seu saldo está negativo' : 'Seu saldo será negativado'"
      confirm-text="Estou ciente" @on-close="() => negativeBalanceModalOpen = false"
      @on-confirm="createOrderFromBalanceModal()" action-buttons>
      <div class="space-y-4">

        <p class="font-light">
          Caso chegue ao limite de
          <span class="font-semibold">{{ toCurrency(-100, { suffix: true }) }}</span>, sua conta será
          <span class="font-semibold">suspensa</span> de abrir novas comandas.
        </p>
        <p class="font-light">
          Favor dirija-se à Tesouraria.
        </p>

        <Divider />
        <ul class="space-y-2 text-sm" v-if="client?.balance !== undefined">
          <li class="flex items-center justify-between">
            <p>Limite de saldo negativo:</p>
            <p>{{ toCurrency(-100, { suffix: true }) }}</p>
          </li>
          <li class="flex items-center justify-between">
            <p>Saldo atual:</p>
            <p :class="{ 'text-rose-500': client.balance < 0 }">
              {{ toCurrency(client.balance, { suffix: true }) }}</p>
          </li>
          <li class="flex items-center justify-between">
            <p>Valor total da compra:</p>
            <p>{{ toCurrency(cartStore.cart.finalPrice, { suffix: true }) }}</p>
          </li>
          <li class="flex items-center justify-between ">
            <p>Saldo após a compra:</p>
            <p class="text-rose-500">{{ toCurrency(client.balance - cartStore.cart.finalPrice, { suffix: true }) }}</p>
          </li>
        </ul>
      </div>

    </Modal>
  </section>

</template>
<style>
.btn-columns {
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
</style>
