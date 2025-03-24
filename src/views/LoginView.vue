<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Icon from '@/components/Icon.vue'
import Logo from '@/components/Logo.vue'
import Input from '@/components/forms/fields/Input.vue' // <-- Import your custom Input component
import { useAuthStore } from '@/stores/auth.store'

const { login } = useAuthStore()

const email = ref('')
const password = ref('')

const submit = () => {
  login(email.value, password.value)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-md shadow-md p-6">
      <div class="flex flex-col items-center mb-6">
        <Logo class="w-24 h-24 mb-2" />
        <span class="text-xl font-semibold">Erasto Gaertner</span>
      </div>

      <form @submit.prevent="submit" class="space-y-5">
        <Input id="email" label="E-mail" type="email" placeholder="meuemail@refeitorio.com" v-model="email" required/>
        <Input id="password" label="Senha" type="password" placeholder="********" v-model="password" required/>

        <Button type="submit" class="w-full flex items-center justify-center mt-4">
          Entrar
          <Icon icon="fa-arrow-right" class="size-4 ml-2" />
        </Button>
      </form>
    </div>
  </div>
</template>
