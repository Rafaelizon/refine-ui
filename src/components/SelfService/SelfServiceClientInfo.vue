<script setup lang="ts">
import { useOrderStore } from '@/stores/order.store';
import { toCurrency } from '@/utils/currency';
import { computed } from 'vue';
import Avatar from '../Avatar.vue';
import Card from '../card/Card.vue';
import Icon from '../Icon.vue';

const orderStore = useOrderStore();
const client = computed(() => orderStore.client);
const state = computed(() => orderStore.state);

</script>

<template>
  <section>
    <Card>
      <template #cardTitleIcon>
        <Icon icon="fa-info-circle" class="text-sky-600" />
      </template>
      <template #cardTitle>Informações</template>
      <template #cardBody>
        <section v-if="!state.error && client" class="flex flex-col gap-4 divide-y">
          <div class="flex items-center gap-4">
            <Avatar :seed="client.name" size="small" />
            <div>
              <p class="text-xs">Cliente:</p>
              <p>{{ client.name }}</p>
            </div>
            <div class="ml-auto">
              <p class="text-xs">Crachá:</p>
              <p>{{ client.credential }}</p>
            </div>
          </div>

          <div v-if="client.balance" class="flex items-center justify-between gap-4 pt-4">
            <div class="flex items-center gap-2">
              <Icon icon="wallet" color="text-sky-600" />
              <p>Saldo:</p>
            </div>
            <p><span class="text-zinc-400">R$</span> {{ toCurrency(client.balance) }}</p>
          </div>
        </section>
      </template>
    </Card>

  </section>

</template>
