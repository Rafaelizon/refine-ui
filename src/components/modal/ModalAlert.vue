<script lang="ts" setup>
import { useModalStore, type ModalType } from '@/stores/modal.store';
import Modal from './Modal.vue';
import Button from '../Button.vue';
import Icon from '../Icon.vue';
import { computed } from 'vue';


const modalStore = useModalStore();

const showButton = computed(() => modalStore.type !== 'success');

const variant = new Map<ModalType, { color: string, ring: string, icon: string }>([
  ['success', { color: 'text-teal-500', ring: 'ring-teal-500 bg-teal-500/20', icon: 'fa-check' }],
  ['error', { color: 'text-rose-500', ring: 'ring-rose-500 bg-rose-500/20', icon: 'fa-xmark' }],
])

</script>
<template>
  <Modal :show="modalStore.opened" @on-close="modalStore.close">
    <div class="grid place-items-center gap-6 mt-4" :class="{ 'mb-4': !showButton }">
      <span class="grid place-items-center p-3 rounded-full ring" :class="variant.get(modalStore.type)?.ring">
        <Icon :icon="variant.get(modalStore.type)!.icon" :color="variant.get(modalStore.type)?.color" size="large" />
      </span>

      <div class="text-center">
        <p class="text-lg">{{ modalStore.title }}</p>
        <p class="text-zinc-500 dark:text-zinc-300 text-sm" v-html="modalStore.body"></p>
      </div>

      <Button v-if="showButton" class="w-full justify-center"
        :variant="modalStore.type === 'success' ? 'primary' : 'danger'" :click="modalStore.close">
        OK
      </Button>
    </div>
  </Modal>
</template>
