type User = {
  credential: string
  name: string
}

export enum UserRole {
  'ADMIN',
  'SELF_SERVICE',
  'STOCK',
  'TREASURY',
}
