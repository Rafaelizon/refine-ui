import type { UserRole } from '@/types/user.role.type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './auth.store'

export const usePermissionStore = defineStore('permission', () => {
  const authStore = useAuthStore()

  const role = computed(() => authStore.authentication?.role)

  const permissions: Record<UserRole, { allowedRoutes: string[]; defaultRedirect?: string }> = {
    ADMIN: { allowedRoutes: ['/login', '/home', '/self-service', '/products', '/reports', '/manual-service'] },
    SELF_SERVICE: { allowedRoutes: ['/login', '/self-service'], defaultRedirect: '/self-service' },
    EMPLOYEE: { allowedRoutes: [] },
    STOCK: { allowedRoutes: [] },
    TERTIARY: { allowedRoutes: [] },
    TREASURY: { allowedRoutes: [] },
  }

  const hasAccess = (route: string) => {
    if (!role.value) return
    return permissions[role.value].allowedRoutes.includes(route)
  }

  const getRedirect = () => {
    if (!role.value) return
    return permissions[role.value].defaultRedirect
  }

  return { role, hasAccess, getRedirect }
})
