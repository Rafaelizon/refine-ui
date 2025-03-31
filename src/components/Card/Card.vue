<script lang="ts" setup>
export type CardSize = 'normal' | 'small';

withDefaults(defineProps<{
  size?: CardSize
}>(), {
  size: 'normal'
})

const cardSizeStyles = new Map<CardSize, string>([
  ['normal', 'p-3.5 gap-3.5'],
  ['small', 'p-2.5 gap-2 text-sm']
])
</script>
<template>
  <div
    class="shadow-sm dark:shadow-lg border bg-white border-zinc-100 rounded-xl dark:bg-zinc-800  dark:border-zinc-100/10">
    <div v-if="$slots['cardTitle']"
      class="dark:bg-zinc-900 border-b border-b-zinc-100 dark:border-b-zinc-100/10 rounded-t-xl flex items-center"
      :class="cardSizeStyles.get(size)">
      <slot name="cardTitleIcon" />
      <slot name="cardTitle" />
    </div>
    <div :class="cardSizeStyles.get(size)" v-if="$slots['cardBody']">
      <slot name="cardBody" />
    </div>
    <div class="overflow-y-auto" :class="cardSizeStyles.get(size)" v-if="$slots['cardBodyScrollable']">
      <slot name="cardBodyScrollable"></slot>
    </div>
    <slot />
    <div v-if="$slots['cardFooter']"
      class="border-t border-t-zinc-100 dark:border-t-zinc-100/10 rounded-b-xl flex items-center"
      :class="cardSizeStyles.get(size)">
      <slot name="cardFooter" />
    </div>
  </div>
</template>
