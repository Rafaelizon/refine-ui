<script setup lang="ts">
import { useSelfServiceOrderStore } from '@/stores/self-service-order-store';
import { toCurrency } from '@/utils/currency';
import { computed } from 'vue';
import Avatar from '../Avatar.vue';
import Card from '../card/Card.vue';
import Icon from '../Icon.vue';

const orderStore = useSelfServiceOrderStore();
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
          <div class="flex justify-between gap-4 ">
            <div class="flex items-center gap-4">
              <Avatar :seed="client.name" size="small" />
              <p class="text-xs">Cliente <br>
                <span class="text-base">{{ client.name }}</span>
              </p>
            </div>
            <p class="text-xs">Crachá <br>
              <span class="text-base">{{ client.credential }}</span>
            </p>
          </div>

          <div v-if="client.balance !== undefined" class="flex items-center justify-between gap-4 pt-4">
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
