<script setup lang="ts">
import type { FormField } from './Form.vue';
import ServiceForm from './reports/ServiceForm.vue';

export type ManualServiceForm = {
  date: FormField,
  credential: FormField,
  store: FormField,
  product: FormField,
  balance?: FormField,
  tare: FormField,
  weight?: FormField,
}

const form: ManualServiceForm = {
  credential: { key: 'credential', type: 'text', label: 'Cliente', placeholder: 'Nome do Cliente...' },
  date: { key: 'date', type: 'date', label: 'Data'},
  store: {
    key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', options: [
      { value: 1, label: 'Erasto Gaertner' },
      { value: 'hospice', label: 'Hospice' },
      { value: 'irati', label: 'Irati' },
    ]
  },
  product: { key: 'product', type: 'text', label: 'Produto/Refeição', placeholder: 'Digite o produto...' },
  balance: { key: 'balance', type: 'text', label: 'Saldo'},
  tare: { key: 'tare', type: 'text', label: 'Tara', placeholder: 'Digite a tara em gramas...' },
  weight: { key: 'weight', type: 'text', label: 'Peso Total', placeholder: 'Digite o peso total em gramas...' },

}

const manualServiceFields: FormField[] = [
  { key: 'date', type: 'date', label: 'Data'},
  { key: 'credential', type: 'text', label: 'Cliente', placeholder: 'Nome do Cliente...' },
  {
    key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', options: [
      { value: 1, label: 'Erasto Gaertner' },
      { value: 'hospice', label: 'Hospice' },
      { value: 'irati', label: 'Irati' },
    ]
  },
  { key: 'product', type: 'text', label: 'Produto/Refeição', placeholder: 'Digite o produto...' },
  { key: 'balance', type: 'text', label: 'Saldo'},
  { key: 'tare', type: 'text', label: 'Tara', placeholder: 'Digite a tara em gramas...' },
  { key: 'weight', type: 'text', label: 'Peso Total', placeholder: 'Digite o peso total em gramas...' },

]

</script>

<template>
  <ServiceForm title="" :fields="manualServiceFields" />
</template>
