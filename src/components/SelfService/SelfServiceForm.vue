<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store';
import { useModalStore } from '@/stores/modal.store';
import { useOrderStore } from '@/stores/order.store';
import { useScaleStore } from '@/stores/scale.store';
import { useScheduleStore } from '@/stores/schedule.store';
import { useToggle } from '@vueuse/core';
import { computed, ref } from 'vue';
import Button from '../Button.vue';
import Card from '../card/Card.vue';
import Input from '../forms/fields/Input.vue';
import Icon from '../Icon.vue';
import Modal from '../modal/Modal.vue';

const reader = ref<string>('');

const cartStore = useCartStore();
const modalStore = useModalStore();
const scaleStore = useScaleStore();
const scheduleStore = useScheduleStore();
const orderStore = useOrderStore();

const weight = computed(() => scaleStore.weight);
const client = computed(() => orderStore.client);
const currentAtendimento = computed(() => scheduleStore.current);

const resetModalOpen = ref<boolean>(false);
const toggleResetModal = useToggle(resetModalOpen);

const confirmOderModalOpen = ref<boolean>(false);
const toggleConfirmOrderModal = useToggle(confirmOderModalOpen);

const reset = () => {
  cartStore.reset();
  orderStore.reset();
  scaleStore.reset()
  toggleResetModal();
  modalStore.success('Atendimento cancelado', 'Seu atendimento foi cancelado com sucesso.');
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

  if (!weight.value) {
    modalStore.error('Peso não detectado', 'Verifique se a balança leu corretamento o peso do prato e tente novamente.')
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
  if (!currentAtendimento.value || !client.value) {
    return;
  }
  createOrder();
}

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
          <Input id="barcode" v-model="reader" size="large" :disabled="!currentAtendimento" autofocus required />
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

    <Modal :show="resetModalOpen" @on-close="() => toggleResetModal()" @on-confirm="reset"
      title="Cancelar o atendimento?" action-buttons cancel-text="Voltar" confirm-text="Sim">
      <p>Tem certeza que deseja cancelar o atendimento?</p>
    </Modal>

    <Modal :show="confirmOderModalOpen" @on-close="() => toggleConfirmOrderModal()" @on-confirm="createOrderFromButton"
      title="Confirmar pedido?" action-buttons>
      <p>Tem certeza que deseja confirmar o pedido?</p>
    </Modal>
  </section>

</template>
<style>
.btn-columns {
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
</style>
