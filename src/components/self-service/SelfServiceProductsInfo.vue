<script setup lang="ts">
defineProps<{
  title?: string,
  content: string
}>()
</script>

<template>
  <div class="px-3.5 first:ps-0 last:pe-0">
    <slot name="title">
      <p class="text-xs font-light" v-if="title">{{ title }}</p>
    </slot>
    <p class="text-base font-normal" v-html="content"></p>
  </div>
</template>
