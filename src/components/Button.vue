<script lang="ts" setup>
import { computed } from 'vue';
import Icon from './Icon.vue';

export type ButtonVariant =
  'primary' | 'secondary' | 'danger' | 'success'
  | 'primary-text' | 'secondary-text' | 'danger-text' | 'success-text';

const props = withDefaults(defineProps<{
  variant?: ButtonVariant,
  click?: () => void,
  disabled?: boolean,
  loading?: boolean
}>(), {
  variant: 'primary',
})

const isDisabled = computed(() => props.disabled || props.loading);

const styles = new Map<ButtonVariant, string>([
  ['primary', 'bg-sky-600 hover:bg-sky-600/80 text-white shadow-sm transition-colors '],
  ['secondary', 'bg-zinc-800/5 dark:bg-zinc-100/10 hover:bg-zinc-800/10 dark:hover:bg-zinc-100/20 dark:border-zinc-100/10 text-zinc-800 dark:text-zinc-300 shadow-sm transition-colors'],
  ['danger', 'bg-rose-400 hover:bg-rose-400/90 text-white shadow-sm transition-colors'],
  ['success', 'bg-teal-500 hover:bg-teal-500/80 text-white shadow-sm transition-colors'],

  ['primary-text', 'text-sky-600 hover:bg-sky-600/10 transition-colors'],
  ['secondary-text', 'text-zinc-800 dark:text-zinc-300 hover:bg-zinc-800/5 dark:hover:bg-zinc-100/10 transition-colors'],
  ['danger-text', 'text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-400/10 transition-colors'],
  ['success-text', 'text-teal-500 hover:bg-teal-500/20 transition-colors'],
]);


</script>
<template>
  <button @click="click" :disabled="isDisabled"
    class="flex items-center justify-center gap-2 text-sm p-3 rounded-xl active:scale-95"
    :class="[styles.get(variant), { 'opacity-30 active:!scale-100 cursor-default': isDisabled }]">
    <Icon v-if="loading" icon="spinner" class="animate-spin" />
    <slot v-else />
  </button>

</template>
