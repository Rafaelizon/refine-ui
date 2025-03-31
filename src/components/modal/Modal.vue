<script setup lang="ts">
import Button, { type ButtonVariant } from '../Button.vue';
import Card from '../card/Card.vue';
import Icon from '../Icon.vue';

export type ModalVariant = 'info' | 'success' | 'warning' | 'danger';

withDefaults(defineProps<{
  show: boolean,
  title?: string,
  titleIcon?: string,
  actionButtons?: boolean,
  confirmText?: string,
  cancelText?: string,
  variant?: ModalVariant,
  modalClasses?: string | string[]
}>(), {
  variant: 'info',
  confirmText: 'Confirmar',
  cancelText: 'Voltar'
})
defineEmits(['on-close', 'on-confirm']);

const colors = new Map<ModalVariant, string>([
  ['info', 'text-sky-600'],
  ['warning', 'text-yellow-500'],
  ['danger', 'text-rose-500'],
  ['success', 'text-teal-500']
])

const actionButtonVariants = new Map<ModalVariant, ButtonVariant>([
  ['info', 'primary'],
  ['danger', 'danger'],
  ['success', 'success'],
  ['warning', 'warning'],
])

const closeButtonVariants = new Map<ModalVariant, ButtonVariant>([
  ['info', 'primary-text'],
  ['danger', 'danger-text'],
  ['success', 'success-text'],
  ['warning', 'warning-text'],
])


</script>

<template>
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div @click.self="$emit('on-close')" v-show="show"
        class="absolute z-20 top-0 left-0 bg-black/60 w-full h-full grid place-items-center">

        <Transition name="modal-content">
          <Card v-if="show" class="transition-all w-[450px]" :class="modalClasses">
            <template #cardTitleIcon v-if="titleIcon">
              <Icon :icon="titleIcon" :class="colors.get(variant)" />
            </template>
            <template #cardTitle v-if="title">
              <div class="flex items-center justify-between w-full">
                <p>{{ title }}</p>
                <Button :click="() => $emit('on-close')" :variant="closeButtonVariants.get(variant)"
                  class="-my-2 -mx-2">
                  <Icon icon="fa-xmark" />
                </Button>
              </div>
            </template>
            <template #cardBody class="grid">
              <slot />

              <section class="flex gap-4 justify-center mt-4" v-if="actionButtons">
                <slot name="modalActions">
                  <Button :click="() => $emit('on-close')" class="justify-center w-full" variant="secondary">
                    {{ cancelText }}
                  </Button>
                  <Button :variant="actionButtonVariants.get(variant)" :click="() => $emit('on-confirm')"
                    class="justify-center w-full">
                    {{ confirmText }}
                  </Button>
                </slot>
              </section>
            </template>
          </Card>
        </Transition>
      </div>
    </Transition>
  </Teleport>

</template>

<style>
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: all 250ms ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  /* cubic-bezier(.47,1.64,.41,.8); */
}

.modal-content-enter-from,
.modal-content-leave-to {
  scale: .85;
  opacity: 0;
}
</style>
