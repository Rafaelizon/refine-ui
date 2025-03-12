import { http } from '@/services/http'
import type { Client } from '@/types/client.type'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useManualServiceStore = defineStore('manual-service', () => {
  const CLIENT_ENDPOINT = '/clients'
  const clients = ref<Client[]>([])
  const client = ref<Client>()
  const state = reactive({ loading: false, error: false })

  const searchClientsByTerm = (term: string) => {
    state.loading = true
    state.error = false
    console.log('term: ', term)

    http
      .get(`${CLIENT_ENDPOINT}?term=${term}`)
      .then((res) => (clients.value = res.data))
      .catch((e) => {
        console.log(e)
        state.error = true
      })
      .finally(() => (state.loading = false))
  }

  const selectClient = (credential: string) => {
    client.value = clients.value.find((client) => client.credential === credential)
    clients.value = []
  }

  const resetOptions = () => {
    clients.value = []
  }

  const reset = () => {
    resetOptions()
    clients.value = []
  }

  return { client, clients, state, searchClientsByTerm, selectClient, reset, resetOptions }
})
