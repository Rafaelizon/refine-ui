<template>
  <Transition name="slide-from-top" mode="out-in">
    <slot />
  </Transition>
</template>

<style scoped>
.slide-from-top-enter-active,
.slide-from-top-leave-active {
  transition: all 100ms ease;
}

.slide-from-top-enter-from,
.slide-from-top-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
