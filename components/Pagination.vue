<template>
  <div class="flex items-center justify-center gap-8 py-8">
    <!-- Previous Button -->
    <button
      @click="emit('previous')"
      :disabled="!hasPrevious || loading"
      class="flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:transform-none dark:disabled:bg-gray-700"
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        class="transition-transform group-hover:-translate-x-0.5"
      >
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="hidden sm:inline">Previous</span>
    </button>

    <!-- Page Indicator -->
    <div class="min-w-[120px] flex items-center justify-center">
      <span 
        v-if="!loading" 
        class="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-bold text-gray-900 dark:text-white"
      >
        {{ pageLabel }}
      </span>
      <div v-else class="w-6 h-6 border-3 border-gray-300 border-t-primary rounded-full animate-spin"></div>
    </div>

    <!-- Next Button -->
    <button
      @click="emit('next')"
      :disabled="!hasNext || loading"
      class="flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:transform-none dark:disabled:bg-gray-700"
    >
      <span class="hidden sm:inline">Next</span>
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        class="transition-transform group-hover:translate-x-0.5"
      >
        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pageLabel: string
  hasPrevious: boolean
  hasNext: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  previous: []
  next: []
}>()
</script>

