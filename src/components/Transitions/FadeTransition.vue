<template>
  <Transition name="fade" mode="out-in">
    <slot />
  </Transition>
</template>
<style scoped>
.fade-enter-active {
  transition: all 250ms ease 150ms;
}

.fade-leave-active {
  transition: none
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(-5px);
  opacity: 0;
}
</style>
