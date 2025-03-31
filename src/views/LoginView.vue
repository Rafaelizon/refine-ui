<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Icon from '@/components/Icon.vue'
import Logo from '@/components/Logo.vue'
import Input from '@/components/forms/fields/Input.vue' // <-- Import your custom Input component
import { useAuthStore } from '@/stores/auth.store'
import Card from '@/components/card/Card.vue'

const authStore = useAuthStore();

const form = ref<{
  email: string,
  password: string
}>({
  email: '',
  password: ''
})

const submit = () => {
  if (form.value.email.length && form.value.password.length) {
    authStore.login(form.value.email, form.value.password)
    form.value.email = '';
    form.value.password = '';
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
    <Card class="w-full max-w-md text-rose-500 ring-2 ring-rose-200 dark:ring-rose-950 border-none shadow-md"
      v-if="authStore.state.error">
      <template #cardBody>
        <div class="items-center gap-4">
          <Icon icon="circle-exclamation" />
          <p class="text-sm">{{ authStore.state.error }}</p>
        </div>
      </template>
    </Card>
    <Card class="w-full max-w-md p-2 ">
      <template #cardBody>
        <header class="space-y-6 mb-8">
          <Logo show-name />
          <h2 class="text-xl font-semibold">Login</h2>
        </header>

        <form @submit.prevent="submit" class="space-y-6">

          <Input id="email" label="E-mail" type="email" placeholder="meuemail@refine.com" v-model="form.email"
            required />
          <Input id="password" label="Senha" type="password" placeholder="********" v-model="form.password" required />

          <Button type="submit" class="w-full flex items-center justify-center mt-4" :loading="authStore.state.loading">
            Entrar
            <Icon icon="fa-arrow-right" size="small" />
          </Button>
        </form>
      </template>

    </Card>
  </div>
</template>
