import type { UserRole } from './user.role.type'

export type Authentication = {
  credential: string
  role: UserRole
  email: string
  name: string
  token: string
}
