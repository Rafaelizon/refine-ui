<script setup lang="ts">
import Breadcrumb from './Breadcrumb.vue';
import Divider from './Divider.vue';

</script>

<template>
  <section class="p-4 flex flex-col gap-4 grow">
    <Breadcrumb />
    <Divider />
    <div class="grow overflow-y-auto">
      <slot />
    </div>
  </section>
</template>
