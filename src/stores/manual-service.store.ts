import { defineStore } from 'pinia';
import { ref } from 'vue';
import { http } from '@/services/http';

export const useManualServiceStore = defineStore('manual-service', () => {
  const loading = ref(false);
  const error = ref<any>(null);

  const generateReport = (formValues: Record<string, any>) => {
    loading.value = true;
    error.value = null;
    http
      .put('/manual-service', formValues)
      .catch(err => {
        error.value = err;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return { loading, error, generateReport };
});
