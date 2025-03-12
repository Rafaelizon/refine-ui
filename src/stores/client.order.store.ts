import { http } from '@/services/http'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useModalStore } from './modal.store'
import type { Client } from '@/types/client.type'
import { useScheduleStore } from './schedule.store'

export const useClientOrderStore = defineStore('client_order', () => {
  const CLIENT_ENDPOINT = '/clients'

  // const modalStore = useModalStore()
  // const scheduleStore = useScheduleStore();
  // const client = ref<Client>()
  // const atendimento = computed(() => scheduleStore.schedule?.current);
  // const state = reactive({ loading: false, error: false })

  // const request = () => {
  //   state.loading = true
  //   state.error = false
  // }

  // const reset = () => {
  //   state.loading = false
  //   state.error = false
  //   client.value = undefined
  // }

  // return { client, state, reset, openOrder }
})
