<script setup lang="ts">
import { type FormField } from '../Form.vue';
import ReportForm from '../reports/ReportForm.vue';

const title = 'Produtos Vendidos';
const reportFields: FormField[] = [
  { key: 'dateFrom', type: 'datetime-local', label: 'De', placeholder: 'Data de início' },
  { key: 'dateTo', type: 'datetime-local', label: 'Até', placeholder: 'Data de fim' },
  { key: 'productGroup', type: 'text', label: 'Grupo do Produto', placeholder: 'Digite o Grupo' },
  { key: 'ProductSearch', type: 'text', label: 'Buscar por Produto', placeholder: 'Digite o produto' },
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
  <ReportForm :title="title" :fields="reportFields" />
</template>
