<script setup lang="ts">
import type { FormField } from '../Form.vue';
import ReportForm from '../reports/ReportForm.vue';

const clientFields: FormField[] = [
  { key: 'dateType', type: 'dropdown', label: 'Tipo da Data', placeholder: 'Selecione...', options: [{ value: 'Todos', label: 'Todos' }] },
  { key: 'dateFrom', type: 'datetime-local', label: 'De', placeholder: 'Data de início' },
  { key: 'dateTo', type: 'datetime-local', label: 'Até', placeholder: 'Data de fim' },
  { key: 'selectClient', type: 'text', label: 'Selecionar Cliente', placeholder: 'Nome do Cliente' },
  {
    key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', options: [
      { value: 'erasto', label: 'Erasto Gaertner' },
      { value: 'hospice', label: 'Hospice' },
      { value: 'irati', label: 'Irati' },
    ]
  },
  { key: 'product', type: 'text', label: 'Buscar por produto', placeholder: 'Digite o produto...' },
  {
    key: 'balanceStatus', type: 'dropdown', label: 'Status do Saldo', placeholder: 'Selecione Status...', options: [
      { value: 'positive', label: 'Positivo' },
      { value: 'all', label: 'Todos' },
      { value: 'negative', label: 'Negativo' },
    ]
  },
  { key: 'clientGroup', type: 'text', label: 'Grupo de Clientes', placeholder: 'Digite o grupo...' },
]

</script>

<template>
  <ReportForm title="Clientes" :fields="clientFields" />
</template>
