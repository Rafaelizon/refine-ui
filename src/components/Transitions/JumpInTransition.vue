<template>
  <Transition name="jump-in" mode="out-in">
    <slot />
  </Transition>
</template>

<style scoped>
.jump-in-enter-active,
.jump-in-leave-active {
  transition: all 250ms ease;
}

.jump-in-enter-from,
.jump-in-leave-to {
  scale: .85;
  opacity: 0;
}
</style>
