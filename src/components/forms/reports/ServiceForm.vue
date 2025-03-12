<script setup lang="ts">
import Button from '@/components/Button.vue';
import Form, { type FormField } from '../Form.vue';
import Icon from '@/components/Icon.vue';
import { useCartStore } from '@/stores/cart.store';
import { ref } from 'vue';
import { computed } from 'vue';

const props = defineProps<{ title: string, fields: FormField[] }>();

const cartStore = useCartStore();

const calculatePrice = () =>{
   //TODO: ADD CART LOGIC
}

const resetCart = () =>{
  cartStore.reset()
}

</script>
<template>
  <Form :title="title" :fields="fields" type="ManualService">
    <template #form-actions>
      <div class="flex items-center gap-4 w-full">
        <div class="flex gap-2">
          <Button type="button" @click="calculatePrice">
            <Icon icon="fa-regular fa-clipboard" />
            Adicionar
          </Button>
          <Button type="reset" variant="danger" :click="() => resetCart()">
            <Icon icon="xmark" />
            Cancelar
          </Button>
          <Button type="submit" variant="success">
            <Icon icon="check" />
            Salvar
          </Button>
        </div>
        <div class="ml-auto">
        </div>
      </div>
    </template>
  </Form>
</template>
