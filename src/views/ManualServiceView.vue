

<script setup lang="ts">
import ReportForm from '@/components/Form/ReportForm.vue';

interface FieldOption {
  value: any;
  label: string;
}

interface FieldConfig {
  key: string;
  type: 'text' | 'date' | 'dropdown';
  label: string;
  placeholder?: string;
  options?: FieldOption[];
}

const fields: FieldConfig[] = [
  { key: 'cliente', type: 'text', label: 'Nome do Cliente' },
  { key: 'saldo', type: 'text', label: 'Saldo do Cliente' },
  { key: 'cracha', type: 'text', label: 'Crachá do Cliente' },
  { key: 'dataAtendimento', type: 'date', label: 'Data do Atendimento' },
  { key: 'tara', type: 'text', label: 'Tara' },
  { key: 'pesoTotal', type: 'text', label: 'Peso Total' },
  { key: 'produtoRefeicao', type: 'dropdown', label: 'Produto',
    options: [
      { value: 'almoco', label: 'ALMOÇO' },
      { value: 'jantar', label: 'JANTAR' },
      { value: 'lancheTarde', label: 'LANCHE DA TARDE' },
      { value: 'cafeManha', label: 'CAFÉ DA MANHA' },
    ],
  },
];
</script>

<template>
  <div class = "p-6">
    <div class="mt-6 p-6 pb-4 border rounded-lg bg-gray-100 dark:bg-zinc-800/60 relative">
      <!-- Pass reportType prop as "manualService" so the ReportForm component uses the manual-service store -->
      <ReportForm title="Manual Service Report" :fields="fields" reportType="manualService" />
    </div>
  </div>
</template>

<style scoped>
</style>
