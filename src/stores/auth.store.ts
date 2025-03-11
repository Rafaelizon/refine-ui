import { http } from '@/services/http'
import type { Authentication } from '@/types/authentication.type'
import type { UserRole } from '@/types/user.role.type'
import type { AxiosError } from 'axios'
import { isBefore } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({ loading: false, error: false })
  const authentication = ref<Authentication>()

  const isAuthenticated = computed(() => checkAuthentication())

  const router = useRouter()

  const login = (email: string, password: string) => {
    beginRequest()

    http
      .post('/auth/login', { email, password })
      .then((res) => {
        saveAuthentication(res.data)
        router.push('/home')
      })
      .catch((error) => handleError(error))
      .finally(() => (state.loading = false))
  }

  const logout = () => {
    authentication.value = undefined
    localStorage.clear()
    router.push('/login')
  }

  const handleError = (error: AxiosError) => {
    state.error = true
    console.error(error)
  }

  const saveAuthentication = (auth: Authentication) => {
    authentication.value = auth

    localStorage.setItem('role', authentication.value.role)
    localStorage.setItem('name', authentication.value.name)
    localStorage.setItem('email', authentication.value.email)
    localStorage.setItem('token', authentication.value.token)
    localStorage.setItem('credential', authentication.value.credential)
  }

  const checkAuthentication = () => {
    const name = localStorage.getItem('name')
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const credential = localStorage.getItem('credential')

    if (token && role && email && credential && name) {
      const decoded = jwtDecode(token)
      const isSameEmail = decoded.sub === email
      const isValid = isBefore(new Date(), new Date(decoded.exp! * 1000))

      if (isSameEmail && isValid) {
        saveAuthentication({ role: role as UserRole, name, token, email, credential })
      }
    }

    return (
      !!authentication.value &&
      !!authentication.value.token &&
      !!authentication.value.email &&
      !!authentication.value.role &&
      !!authentication.value.credential
    )
  }

  const beginRequest = () => {
    state.error = false
    state.loading = true
  }

  return { authentication, login, logout, isAuthenticated }
})
