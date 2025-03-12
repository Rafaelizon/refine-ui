<script setup lang="ts">
import type { FormField } from '../Form.vue';
import ReportForm from '../reports/ReportForm.vue';


const orderFields: FormField[] = [
  { key: 'dateFrom', type: 'datetime-local', label: 'De', placeholder: 'Data de início' },
  { key: 'dateTo', type: 'datetime-local', label: 'Até', placeholder: 'Data de fim' },
  { key: 'selectClient', type: 'text', label: 'Selecionar Cliente', placeholder: 'Nome do Cliente' },
  { key: 'products', type: 'text', label: 'Produtos', placeholder: 'Digite os produtos' },
  {
    key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', options: [
      { value: 'Erasto Gaertner', label: 'Erasto Gaertner' },
      { value: 'Hospice', label: 'Hospice' },
      { value: 'Irati', label: 'Irati' },
    ]
  },
  { key: 'operator', type: 'text', label: 'Operador', placeholder: 'Digite o operador' },
]

</script>

<template>
  <ReportForm title="Pedidos" :fields="orderFields" />
</template>
