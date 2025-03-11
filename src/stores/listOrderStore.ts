import { defineStore } from 'pinia'
import { http } from '@/services/http'
import { computed, reactive } from 'vue'
import type { AxiosResponse } from 'axios'
import type { OrderParams } from '@/types/order.params.type'

export const useListOrderStore = defineStore('order-list', () => {
  const ORDERS_ENDPOINT = '/orders'
  // Separate arrays for week and month orders
  const state = reactive({ loading: false, error: false, weekOrderList: [], monthOrderList: [] })

  // Generic fetchOrders function that updates the target array based on the filter
  const fetchOrders = (params: OrderParams, target: 'week' | 'month') => {
    state.loading = true
    state.error = false

    setTimeout(() => {
      http
        .get(ORDERS_ENDPOINT, { params })
        .then((response: AxiosResponse) => {
          if (target === 'week') {
            state.weekOrderList = response.data
          } else {
            state.monthOrderList = response.data
          }
        })
        .catch((err) => {
          console.error(err)
          state.error = true
        })
        .finally(() => {
          state.loading = false
        })
    }, 500)
  }

  const fetchOrdersThisWeek = () => {
    const today = new Date()
    const diff = today.getDay()
    const lastSunday = new Date(today)
    lastSunday.setDate(today.getDate() - diff)
    lastSunday.setHours(0, 0, 0, 0)
    const dateFrom = lastSunday.toISOString()

    fetchOrders({ dateFrom }, 'week')
  }

  const fetchOrdersThisMonth = () => {
    const today = new Date()
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    firstOfMonth.setHours(0, 0, 0, 0)
    const dateFrom = firstOfMonth.toISOString()

    fetchOrders({ dateFrom }, 'month')
  }

  const weekOrdersCount = computed(() => state.weekOrderList.length)
  const monthOrdersCount = computed(() => state.monthOrderList.length)

  return { fetchOrdersThisWeek, fetchOrdersThisMonth, state, weekOrdersCount, monthOrdersCount }
})
