<template>
  <div class="flex flex-col items-center justify-center py-20">
    <div class="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
    <p class="mt-4 text-gray-600 dark:text-gray-400">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

