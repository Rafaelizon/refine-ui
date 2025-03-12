<script setup lang="ts">
import Button from '@/components/Button.vue';
import Form, { type FormField } from '../Form.vue';
import Icon from '@/components/Icon.vue';
defineProps<{ title: string, fields: FormField[] }>();
</script>

<template>
  <Form :title="title" :fields="fields">
    <template #formActions>
      <Button type="submit">
        <Icon icon="fa-regular fa-clipboard" />
        Gerar relatório
      </Button>
    </template>
  </Form>
</template>
