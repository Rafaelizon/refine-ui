<script setup lang="ts">
import { type FormField } from '../Form.vue';
import ReportForm from '../reports/ReportForm.vue';

const residentsFields: FormField[] = [
  { key: 'dateFrom', type: 'datetime-local', label: 'De', placeholder: 'Data de início' },
  { key: 'dateTo', type: 'datetime-local', label: 'Até', placeholder: 'Data de fim' },
]

</script>

<template>
  <ReportForm title="Residentes e Acadêmicos" :fields="residentsFields" />

</template>
