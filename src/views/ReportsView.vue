<script setup lang="ts">
import { ref, type Component } from "vue";
import DropdownSelect, { type DropdownSelectOption } from "@/components/forms/fields/DropdownSelect.vue";
import ReportClientsForm from "@/components/forms/reports/ReportClientsForm.vue";
import Section from "@/components/Section.vue";
import Card from "@/components/card/Card.vue";
import ModalAlert from "@/components/modal/ModalAlert.vue";
import ReportProductsForm from "@/components/forms/reports/ReportProductsForm.vue";
import ReportOrdersForm from "@/components/forms/reports/ReportOrdersForm.vue";
import ReportResidentsForm from "@/components/forms/reports/ReportResidentsForm.vue";
import { useReportStore } from "@/stores/report.store";

type ReportOptions = 'clients' | 'orders' | 'products' | 'residents';

const reportFormComponents = new Map<ReportOptions, Component>([
  ['clients', ReportClientsForm],
  ['orders', ReportOrdersForm],
  ['products', ReportProductsForm],
  ['residents', ReportResidentsForm]
])

const reportOptions: DropdownSelectOption[] = [
  { value: 'clients', label: 'Clientes' },
  { value: 'orders', label: 'Pedidos' },
  { value: 'products', label: 'Produtos Vendidos' },
  { value: 'residents', label: 'Residentes e Acadêmicos' },
]

const selectedReport = ref<ReportOptions>();
const reportStore = useReportStore();

// Updated report generation function using the store
const generateReport = (form: any) => {
  reportStore.generateReport(form);
};

</script>

<template>
  <Section>
    <Card class="w-max">
      <template #cardBody>
        <DropdownSelect id="reportOptions" :options="reportOptions" v-model="selectedReport"
          label="Selecione um Relatório" placeholder="Escolha um relatório..." />
      </template>
    </Card>

    <!-- Detailed form appears after a report is selected -->
    <Transition name="fade" mode="out-in">
      <div v-if="selectedReport">
        <component @submit="generateReport" :key="selectedReport" :is="reportFormComponents.get(selectedReport)" />
      </div>
    </Transition>
    <ModalAlert />
  </Section>
</template>
