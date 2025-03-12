<template>
  <div class="shadow-sm dark:shadow-lg bg-white dark:bg-zinc-800 rounded-xl dark:border dark:border-zinc-100/10">
    <div v-if="$slots['cardTitle']"
      class="p-4 dark:bg-zinc-900 border-b border-b-zinc-100 dark:border-b-zinc-100/10 rounded-t-xl flex items-center gap-4">
      <slot name="cardTitleIcon" />
      <slot name="cardTitle" />
    </div>
    <div class="p-4" v-if="$slots['cardBody']">
      <slot name="cardBody" />
    </div>
    <div class="p-4 overflow-y-auto" v-if="$slots['cardBodyScrollable']">
      <slot name="cardBodyScrollable"></slot>
    </div>
    <slot />
    <div v-if="$slots['cardFooter']"
      class="p-4 border-t border-t-zinc-100 dark:border-t-zinc-100/10 rounded-b-xl flex items-center gap-4">
      <slot name="cardFooter" />
    </div>
  </div>
</template>
