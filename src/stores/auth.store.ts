import { http } from '@/services/http'
import type { Authentication } from '@/types/authentication.type'
import type { User } from '@/types/user.type'
import { computedAsync } from '@vueuse/core'
import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const AUTH_ENDPOINT = '/auth'
  const USER_ENDPOINT = '/users'

  const state = reactive({ loading: false, error: false })
  const authentication = ref<Authentication>()
  const user = ref<User>()

  const isAuthenticated = computed<boolean>(
    () => !!authentication.value && !!user.value && authentication.value.id === user.value.id,
  )
  const router = useRouter()

  const login = (email: string, password: string) => {
    beginRequest()

    http
      .post(`${AUTH_ENDPOINT}/login`, { email, password })
      .then((res) => {
        saveAuthentication(res.data)
        router.push('/home')
      })
      .catch((error) => handleError(error))
      .finally(() => (state.loading = false))
  }

  const alreadyAuthenticated = (token: string, userId: number) => {
    return (
      authentication.value &&
      authentication.value.id === userId &&
      authentication.value.token === token &&
      user.value &&
      user.value.id === authentication.value.id
    )
  }

  const checkAuthentication = async () => {
    const userId = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')

    if (!userId || !token) {
      return
    }

    if (alreadyAuthenticated(token, parseInt(userId))) {
      return
    }

    await http
      .post(`${AUTH_ENDPOINT}/validate-token`, { userId, token })
      .then((res) => {
        if (res.data) {
          saveAuthentication({ id: parseInt(userId), token: token })
        }
      })
      .catch((e) => console.log(e))

    if (authentication.value && !user.value) {
      await fetchAuthenticatedUser(parseInt(userId))
    }
  }

  const logout = () => {
    router.push('/login')
    localStorage.clear()
    user.value = undefined
    authentication.value = undefined
  }

  const handleError = (error: AxiosError) => {
    state.error = true
    console.error(error)
  }

  const saveAuthentication = (auth: Authentication) => {
    authentication.value = auth
    localStorage.setItem('user_id', authentication.value.id.toString())
    localStorage.setItem('token', authentication.value.token)
  }

  const fetchAuthenticatedUser = async (userId: number) => {
    await http
      .get(`${USER_ENDPOINT}/${userId}`)
      .then((res) => {
        user.value = res.data
      })
      .catch((e) => console.log(e))
  }

  const beginRequest = () => {
    state.error = false
    state.loading = true
  }

  return { authentication, user, login, logout, isAuthenticated, checkAuthentication }
})
