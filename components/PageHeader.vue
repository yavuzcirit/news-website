<template>
  <header class="text-center mb-12">
    <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
      <slot name="title">{{ title }}</slot>
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

