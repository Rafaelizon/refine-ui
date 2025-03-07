<script setup lang="ts">
import { ref } from "vue";
import DropdownSelect from "@/components/DropDownBox.vue";
import ReportForm from "@/components/Form/ReportForm.vue";

// Options for report selection
const reportOptions = [
  { value: "Clientes", label: "Clientes" },
  { value: "Pedidos", label: "Pedidos" },
  { value: "ProdutosVendidos", label: "Produtos Vendidos" },
  { value: "ResidentesAcademicos", label: "Residentes e Acadêmicos"},
];

// Configuration objects for each report
const reportConfigs = {
  Clientes: [
    { key: 'dateType', type: 'dropdown', label: 'Tipo da Data', placeholder: 'Selecione...', options: [{ value: 'Todos', label: 'Todos' }] },
    { key: 'dateFrom', type: 'date', label: 'De', placeholder: 'Data de início' },
    { key: 'dateTo', type: 'date', label: 'Até', placeholder: 'Data de fim' }  ,
    { key: 'selectClient', type: 'text', label: 'Selecionar Cliente', placeholder: 'Nome do Cliente' },
    { key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', options: [
      { value: 'Erasto Gaertner', label: 'Erasto Gaertner' },
      { value: 'Hospice', label: 'Hospice' },
      { value: 'Irati', label: 'Irati' },
    ]},
    { key: 'product', type: 'text', label: 'Buscar por produto', placeholder: 'Digite o produto...' },
    { key: 'balanceStatus', type: 'dropdown', label: 'Status do Saldo', placeholder: 'Selecione Status...', options: [
      { value: 'Positivo', label: 'Positivo' },
      { value: 'Todos', label: 'Todos' },
      { value: 'Negativo', label: 'Negativo' },
    ]},
    { key: 'clientGroup', type: 'text', label: 'Grupo de Clientes', placeholder: 'Digite o grupo...' },
  ],
  Pedidos: [
    { key: 'dateFrom', type: 'date', label: 'De', placeholder: 'Data de início' },
    { key: 'dateTo', type: 'date', label: 'Até', placeholder: 'Data de fim' },
    { key: 'selectClient', type: 'text', label: 'Selecionar Cliente', placeholder: 'Nome do Cliente' },
    { key: 'products', type: 'text', label: 'Produtos', placeholder: 'Digite os produtos' },
    { key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', options: [
      { value: 'Erasto Gaertner', label: 'Erasto Gaertner' },
      { value: 'Hospice', label: 'Hospice' },
      { value: 'Irati', label: 'Irati' },
    ]},
    { key: 'operator', type: 'text', label: 'Operador', placeholder: 'Digite o operador' },
  ],
  ProdutosVendidos: [
    { key: 'dateFrom', type: 'date', label: 'De', placeholder: 'Data de início' },
    { key: 'dateTo', type: 'date', label: 'Até', placeholder: 'Data de fim' },
    { key: 'productGroup', type: 'text', label: 'Grupo do Produto', placeholder: 'Digite o Grupo' },
    { key: 'ProductSearch', type: 'text', label: 'Buscar por Produto', placeholder: 'Digite o produto' },
    { key: 'store', type: 'dropdown', label: 'Loja', placeholder: 'Selecione Loja...', options: [
      { value: 'Erasto Gaertner', label: 'Erasto Gaertner' },
      { value: 'Hospice', label: 'Hospice' },
      { value: 'Irati', label: 'Irati' },
    ]},
    { key: 'operator', type: 'text', label: 'Operador', placeholder: 'Digite o operador' },
  ],
  ResidentesAcademicos: [
    { key: 'dateFrom', type: 'date', label: 'De', placeholder: 'Data de início' },
    { key: 'dateTo', type: 'date', label: 'Até', placeholder: 'Data de fim' },
  ]
};

const selectedReport = ref<string | null>(null);

const handleSelection = (selectedValue: string | number) => {
  selectedReport.value = selectedValue as string;
};
</script>

<template>
  <div class="p-6">
    <!-- Report selection Dropdown -->
    <div class="mb-4 p-4 border rounded-lg inline-block">
      <DropdownSelect
        :options="reportOptions"
        label="Selecione um Relatório"
        placeholder="Escolha um relatório..."
        @selected="handleSelection"
      />
    </div>

    <!-- Detailed form appears after a report is selected -->
    <Transition name="fade">
      <div
        v-if="selectedReport !== null"
        class="mt-6 p-4 pb-4 border rounded-lg bg-gray-100 dark:bg-zinc-800/60 relative"
      >
        <!-- Using :key forces a re-mount when selectedReport changes -->
        <ReportForm
          :key="selectedReport"
          :title="selectedReport"
          :fields="reportConfigs[selectedReport]"
        />
      </div>
    </Transition>
  </div>
</template>
