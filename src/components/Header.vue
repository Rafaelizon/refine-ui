<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.store';
import Avatar from './Avatar.vue';
import Button from './Button.vue';
import Icon from './Icon.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';


const authStore = useAuthStore();



</script>
<template>
  <header class="flex items-center justify-between p-4 w-full border-b dark:border-b-zinc-100/10">

    <section class="flex items-center gap-4">
      <Avatar :seed="authStore.authentication?.name" />
      <div class="text-sm">
        <p><span class="font-semibold">Olá, </span><br>{{ authStore.authentication?.name }}</p>
      </div>
    </section>

    <section class="flex gap-2">
      <ThemeSwitcher />
      <Button variant="danger" :click="authStore.logout">
        <Icon icon="fa-power-off" />
      </Button>
    </section>
  </header>
</template>
