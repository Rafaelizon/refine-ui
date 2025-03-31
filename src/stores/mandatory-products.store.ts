import { http } from '@/services/http'
import type { Product } from '@/types/product.type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMandatoryProductsStore = defineStore('mandatory-products', () => {
  const products = ref<Product[]>([])

  const getMandatoryProductsForAtendimento = async (atendimentoId: number) => {
    try {
      const res = await http.get(`/atendimentos/${atendimentoId}/products/mandatory`)
      return (products.value = res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const isProductMandatory = (code: string) => {
    return products.value.some((product) => product.code === code)
  }

  const reset = () => {
    products.value = []
  }

  return { products, getMandatoryProductsForAtendimento, reset, isProductMandatory }
})
