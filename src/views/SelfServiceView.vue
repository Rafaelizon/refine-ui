<script setup lang="ts">
import Container from '@/components/Container.vue';
import Modal from '@/components/modal/Modal.vue';
import ModalAlert from '@/components/modal/ModalAlert.vue';
import SelfServiceClientInfo from '@/components/self-service/SelfServiceClientInfo.vue';
import SelfServiceCurrent from '@/components/self-service/SelfServiceCurrent.vue';
import SelfServiceForm from '@/components/self-service/SelfServiceForm.vue';
import SelfServiceHeader from '@/components/self-service/SelfServiceHeader.vue';
import SelfServiceProducts from '@/components/self-service/SelfServiceProducts.vue';
import SelfServiceScale from '@/components/self-service/SelfServiceScale.vue';
import SelfServiceTotal from '@/components/self-service/SelfServiceTotal.vue';
import Spinner from '@/components/Spinner.vue';
import { useCartStore } from '@/stores/cart.store';
import { useFullscreenStore } from '@/stores/fullscreen.store';
import { useScaleStore } from '@/stores/scale.store';
import { useScheduleStore } from '@/stores/schedule.store';
import { useSelfServiceOrderStore } from '@/stores/self-service-order-store';
import { computed, onBeforeUnmount } from 'vue';

onBeforeUnmount(() => {
  cartStore.reset();
  orderStore.reset();
  scheduleStore.reset();
})


const { toggle } = useFullscreenStore();
const orderStore = useSelfServiceOrderStore();
const scheduleStore = useScheduleStore();
const scaleStore = useScaleStore();
const cartStore = useCartStore();


const loading = computed(() => {
  return orderStore.state.loading
    || cartStore.state.loading
    || orderStore.state.loading
})

const serving = computed(() => scheduleStore.schedule?.serving)

const showScaleSection = computed(() => {
  return orderStore.client && cartStore.cart.items.some(item => item.product.priceType === 'PRICE_PER_KG');
})

</script>
<template>
  <section class="h-full bg-[#f5f5f5] text-black dark:bg-zinc-800 dark:text-white">
    <SelfServiceHeader @fullscreen="toggle" />
    <Container class="grid grid-cols-2 pt-4 gap-4" :class="{ 'grid-cols-1': !serving }">
      <section class="flex flex-col gap-4 h-[calc(100dvh-113px)]">
        <SelfServiceCurrent />
        <SelfServiceForm v-if="serving" />
      </section>
      <section class="flex flex-col gap-4 h-[calc(100dvh-113px)]" v-if="serving">
        <SelfServiceClientInfo />
        <SelfServiceScale v-if="showScaleSection" />
        <SelfServiceProducts />
        <div class="mt-auto">
          <SelfServiceTotal />
        </div>
      </section>
    </Container>
    <Modal :show="loading">
      <div class="py-10 grid place-items-center">
        <Spinner size="large" />
      </div>
    </Modal>

    <Modal :show="scaleStore.state.loading">
      <div class="py-10 grid place-items-center">
        <Spinner size="large" />
        <p class="mt-4 font-light">Lendo o peso da balança...</p>
      </div>
    </Modal>



    <ModalAlert />
  </section>
</template>

<style></style>
