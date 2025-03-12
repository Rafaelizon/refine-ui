<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import SlideFromTop from '@/components/transitions/SlideFromTop.vue';
import { useDebounceFn } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import type { FormFieldOption } from '../Form.vue';
import Input from './Input.vue';

const props = withDefaults(defineProps<{
  id: string,
  delay?: number,
  placeholder?: string,
  options: FormFieldOption[],
  label?: string,
  maxWait?: number,
  loading?: boolean
}>(), {
  delay: 500,
  maxWait: 5000
})

const emit = defineEmits(['search', 'selected', 'reset']);
const minSearchLength = 3;
const search = ref<string>();
const selectedOption = ref<FormFieldOption>();
const loading = ref<boolean>(false);
const isLoading = computed(() => loading.value || props.loading);


const emitChange = useDebounceFn(() => {
  if (search.value) {
    emit('search', search.value.trim());
  }
  loading.value = false;
}, props.delay, { maxWait: props.maxWait })

watch(search, () => {

  if (search.value && search.value.length >= minSearchLength && search.value !== selectedOption.value?.label) {
    loading.value = true;
    emitChange();
  }

  if (!search.value?.length) {
    emit('reset');
  }
}, { flush: 'post' })

const select = (option: FormFieldOption) => {
  selectedOption.value = option;
  search.value = option.label;
  emit('selected', selectedOption.value.value);
}

const showDropdown = computed(() => {
  return (!selectedOption.value || search.value !== selectedOption.value.label)
    && search.value?.length && search.value.length >= 3
});

</script>

<template>
  <div class="relative">
    <Input :id="id" v-model="search" :label="label" :placeholder="placeholder" :loading="isLoading" />
    <SlideFromTop>
      <div v-if="options && options.length && showDropdown"
        class="absolute w-full border border-zinc-100 dark:border-zinc-100/10 mt-0.5 bg-zinc-50 dark:bg-zinc-900 rounded-lg shadow-lg text-sm select-none divide-y divide-zinc-100 dark:divide-zinc-800">
        <TransitionGroup tag="ul" name="dropdown-options">
          <li v-for="option in options" :key="option.value" @click="select(option)"
            class="flex items-center justify-between p-3 font-light hover:bg-sky-600 hover:text-white active:scale-[98%] transition-all first:rounded-t-lg last:rounded-b-lg">
            <p>{{ option.label }}</p>
            <Icon icon="arrow-right" size="small" />
          </li>
        </TransitionGroup>

      </div>
    </SlideFromTop>
  </div>
</template>

<style scoped>
.dropdown-options-move,
.dropdown-options-enter-active,
.dropdown-options-leave-active {
  transition: all 150ms ease;
}

.dropdown-options-enter-from,
.dropdown-options-leave-to {
  position: absolute;
  opacity: 0;
}

.dropdown-options-leave-to {
  transform: translateX(10px);
}

.dropdown-options-enter-from {
  transform: translateX(-10px);
}
</style>
