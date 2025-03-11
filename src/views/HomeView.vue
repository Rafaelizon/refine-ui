<script setup lang="ts">
import RouterButton from '@/components/RouterButton.vue';
import Section from '@/components/Section.vue';
import HomeReportBox from '@/components/HomeReportBox.vue';

</script>

<template>

  <Section title="Home" icon="house" class="flex-1">
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
  </Section>
  <section>
      <footer class="mt-auto bg-white-800 dark:bg-zinc-800 shadow-md">
        <div class="router-link-grid p-4">
          <HomeReportBox title="Clientes Cadastrados"/>
          <HomeReportBox title="Usuarios Cadastrados"/>
          <HomeReportBox title="Produtos Cadastrados"/>
          <HomeReportBox title="Pedidos da Semana" :type="'WeekOrders'"/>
          <HomeReportBox title="Total Em Vendas da Semana" />
          <HomeReportBox title="Total Em Vendas do Mês"/>
        </div>
    </footer>
  </section>

</template>

<style>
.router-link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: 1rem;
}
</style>