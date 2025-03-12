<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import type { BaseInputProps, InputSize } from "../fields/Input.vue";

const modelValue = defineModel<string | number>()

export type DropdownSelectOption = {
  value: string | number;
  label: string;
}

const dropdownSizes = new Map<InputSize, string>([
  ['large', 'p-4 me-4'],
  ['normal', 'p-3 me-3 text-sm']
])

type DropdownSelectProps = BaseInputProps & { options: DropdownSelectOption[] };

withDefaults(defineProps<DropdownSelectProps>(), {
  placeholder: 'Select one option...',
  size: 'normal',
  required: true
});

</script>

<template>
  <div class="grid gap-2">
    <label v-if="label" :for="id" class="text-sm text-gray-900 dark:text-gray-200">{{ label }}</label>
    <div
      class="flex items-center  rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:ring-1 focus-within:!ring-2 hover:ring-sky-600 focus-within:ring-sky-600 focus-within:ring-offset-2 dark:focus-within:ring-offset-zinc-800 transition-all"
      :class="{ 'hover:!ring-transparent focus-within:!ring-0 !bg-opacity-30 outline-dashed outline-1 outline-zinc-200 dark:outline-zinc-700': disabled }">
      <select :id="id" :placeholder="placeholder" v-model="modelValue" :required="required" :disabled="disabled"
        class="bg-transparent w-full outline-none" :class="dropdownSizes.get(size)">
        <option value="" class="bg-zinc-100" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value" class="text-gray-700">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
