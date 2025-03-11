<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { useListOrderStore } from '@/stores/listOrderStore'
import { onMounted } from 'vue'

type StatBoxProps = {
  title?: string,
  value?: string | number,
  type?: string,
}

const listOrderStore = useListOrderStore()


onMounted(() => {
  listOrderStore.fetchOrdersThisWeek()
})


// Directly assign the computed property from the store
const props = withDefaults(defineProps<StatBoxProps>(), {
  title: 'Default Title',
})

</script>

<template>
  <div class="p-4 rounded-lg shadow-md bg-white dark:bg-zinc-900 w-full max-w-sm">
    <i :class="'text-sky-500 mb-2 text-xl'"/>
    <div>
      <div class="text-xs uppercase tracking-wide text-zinc-400">
        {{ props.title }}
      </div>
      <div class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100" v-if="props.type === 'WeekOrders'" >
        {{listOrderStore.weekOrdersCount}}
      </div>
    </div>
  </div>
</template>
