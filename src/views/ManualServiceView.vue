<script setup lang="ts">
import Section from "@/components/Section.vue";
import ModalAlert from "@/components/modal/ModalAlert.vue";
import ManualServiceForm, { type ManualServiceForm as ManualServiceFormType } from "@/components/forms/ManualServiceForm.vue";

const submitCart = (form: ManualServiceFormType) => {
  console.log(form)
}


</script>

<template>
  <Section>
    <ManualServiceForm @submit="submitCart" />
    <ModalAlert />
  </Section>
</template>
