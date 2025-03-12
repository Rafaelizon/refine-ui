<script setup lang="ts">
import { useManualServiceStore } from '@/stores/manual-service.store';
import { toCurrency } from '@/utils/currency';
import { formatWeight } from '@/utils/decimal';
import { computed, ref } from 'vue';
import Button from '../Button.vue';
import Card from '../card/Card.vue';
import Icon from '../Icon.vue';
import JumpInTransition from '../transitions/JumpInTransition.vue';
import DebounceSearch from './fields/DebounceSearch.vue';
import DropdownSelect from './fields/DropdownSelect.vue';
import Input from './fields/Input.vue';
import Form, { type FormFieldOption } from './Form.vue';

export type ManualServiceForm = {
  date: string,
  store: string | number,
  tare: string,
}

const manualServiceStore = useManualServiceStore();
const clients = computed(() => manualServiceStore.clients);
const client = computed(() => manualServiceStore.client);
const searchClientOptions = computed(() => {
  return clients.value.map(client => {
    return {
      value: client.credential,
      label: `${client.credential} / ${client.name}`
    }
  });
})

const tare = ref<string>(formatWeight(0.412, { suffix: 'gram' }))

const form = ref<ManualServiceForm>({
  date: '',
  store: '',
  tare: tare.value
});

const storeOptions: FormFieldOption[] = [
  { value: 1, label: 'Erasto Gaertner' },
  { value: 2, label: 'Hóspice' },
  { value: 3, label: 'Irati' },
]

const searchClient = (term: string) => {
  manualServiceStore.searchClientsByTerm(term);
}

const setSelectedClient = (crendential: string) => {
  manualServiceStore.selectClient(crendential);
}

</script>

<template>
  <section class="flex flex-col gap-4">

    <Card class="max-h-max max-w-max transition-all">
      <template #cardTitle>Pesquisar cliente</template>
      <template #cardBody>
        <div class="grid min-w-[400px] gap-4 divide-x divide-zinc-100 dark:divide-zinc-100/10"
          :class="{ 'grid-cols-[1fr_2fr]': client }">
          <DebounceSearch id="client-debounce" :loading="manualServiceStore.state.loading"
            :options="searchClientOptions" @search="searchClient" @selected="setSelectedClient"
            @reset="manualServiceStore.resetOptions()" placeholder="Buscar por crachá ou nome..." label="Cliente" />
          <JumpInTransition>
            <div v-if="client" class="ps-4">
              <div class="grid lg:grid-cols-4 gap-4">
                <Input id="client-name" class="md:col-span-2" label="Nome" :modelValue="client.name" disabled />
                <Input id="client-credential" label="Crachá" :modelValue="client.credential" disabled />
                <Input id="client-balance" label="Saldo"
                  :modelValue="client.balance ? toCurrency(client?.balance, { suffix: true }) : 'n/a'" disabled />
              </div>
            </div>
          </JumpInTransition>
        </div>
      </template>
    </Card>
    <Form v-if="client">
      <template #formTitle>Informações</template>
      <template #formInputs>
        <Input id="date" type="datetime-local" v-model="form.date" label="Data e Hora" />
        <DropdownSelect id="store" v-model="form.store" label="Loja" :options="storeOptions" />
        <Input id="tare" :modelValue="form.tare" label="Tara" disabled />

      </template>
      <template #formActions>
        <div class="flex items-center gap-4 w-full">
          <div class="flex gap-2">
            <Button type="reset" variant="danger">
              <Icon icon="rotate-left" />
              Reiniciar
            </Button>
            <Button type="submit" variant="success">
              Salvar
              <Icon icon="check" />
            </Button>
          </div>
        </div>
      </template>
    </Form>
  </section>
</template>
