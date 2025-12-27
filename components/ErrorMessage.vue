<template>
  <div class="max-w-md mx-auto text-center py-20">
    <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8">
      <h2 class="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">{{ title }}</h2>
      <p class="text-red-700 dark:text-red-300 mb-4">{{ message }}</p>
      <slot name="action">
        <button 
          v-if="showRetry"
          @click="emit('retry')" 
          class="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all transform hover:scale-105"
        >
          Try Again
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  message: string
  showRetry?: boolean
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

