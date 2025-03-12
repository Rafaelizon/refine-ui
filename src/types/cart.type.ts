import type { OrderItemRequest } from './order.item.request.type'
import type { OrderItem } from './order.item.type'

export type Cart = {
  items: OrderItem[]
  discount: number
  finalPrice: number
  originalPrice: number
  discountedPrice: number
}

export type CartRequest = {
  crendential: string
  atendimentoId: number
  items: OrderItemRequest[]
}
