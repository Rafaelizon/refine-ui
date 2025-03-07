<script setup lang="ts">
import RouterButton from '@/components/RouterButton.vue';
import Section from '@/components/Section.vue';

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
      <RouterButton to="/manual-service" icon="mug-saucer">
        At. Manual
      </RouterButton>

    </div>
  </Section>
</template>

<style>
.router-link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;
}
</style>
