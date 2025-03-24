<script setup lang="ts">
import HomeReportBox from '@/components/HomeReportBox.vue';
import RouterButton from '@/components/RouterButton.vue';
import Section from '@/components/Section.vue';
import { useListStore } from '@/stores/list.store';
import { toCurrency } from '@/utils/currency';
import { onMounted } from 'vue';

const listStore = useListStore()


onMounted(() => {
  listStore.fetchOrdersThisWeek()
  listStore.fetchOrdersThisMonth()
  listStore.fetchClients()
  listStore.fetchProducts()
})

</script>

<template>

  <Section title="Home" icon="house">
    <div class="router-link-grid">
      <RouterButton to="/self-service" icon="utensils">
        Atendimento
      </RouterButton>
      <RouterButton to="/products" icon="box-archive">
        Produtos
      </RouterButton>
      <RouterButton to="/reports" icon="clipboard-list">
        Relatorios
      </RouterButton>
      <RouterButton to="/manual-service" icon="mug-hot">
        Atendimento manual
      </RouterButton>
      <RouterButton to="" icon="user" variant="danger">
        Clientes
      </RouterButton>
      <RouterButton to="" icon="users" variant="danger">
        Usuarios
      </RouterButton>
      <RouterButton to="" icon="credit-card" variant="danger">
        Saldo Alimentação
      </RouterButton>
      <RouterButton to="" icon="xmark" variant="danger">
        Remover Pedido
      </RouterButton>
    </div>
    <div class="router-link-grid  mt-auto">
      <HomeReportBox title="Clientes Cadastrados">{{ listStore.clientsCount }}</HomeReportBox>
      <HomeReportBox title="Usuarios Cadastrados">45</HomeReportBox>
      <HomeReportBox title="Produtos Cadastrados">{{ listStore.productsCount }}</HomeReportBox>
      <HomeReportBox title="Pedidos da Semana">{{ listStore.weekOrdersCount }}</HomeReportBox>
      <HomeReportBox title="Total Em Vendas da Semana">{{ toCurrency(listStore.weekFinalPriceTotal, { suffix: true }) }}      </HomeReportBox>
      <HomeReportBox title="Total Em Vendas do Mês">{{ toCurrency(listStore.monthFinalPriceTotal, { suffix: true }) }}      </HomeReportBox>
    </div>
  </Section>


</template>

<style>
.router-link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: 1rem;
}
</style>
