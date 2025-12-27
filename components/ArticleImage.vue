<template>
  <div 
    :class="[
      'flex items-center justify-center overflow-hidden',
      containerClass
    ]"
  >
    <img 
      v-if="src && !hasError" 
      :src="src" 
      :alt="alt"
      :class="imageClass"
      @error="handleError"
    />
    <div 
      v-else 
      :class="[
        'flex flex-col items-center justify-center gap-3 text-gray-400 dark:text-gray-500 opacity-50 w-full h-full',
        placeholderClass
      ]"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        :width="iconSize" 
        :height="iconSize" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="1.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/>
        <path d="M15 18h-5"/>
        <path d="M10 6h8v4h-8V6Z"/>
      </svg>
      <span class="text-sm font-medium uppercase tracking-wide">{{ placeholderText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    iconSize?: number
    placeholderText?: string
    containerClass?: string
    imageClass?: string
    placeholderClass?: string
  }>(),
  {
    iconSize: 64,
    placeholderText: 'News Article',
    containerClass: 'w-full h-48 bg-gray-200 dark:bg-gray-700',
    imageClass: 'w-full h-full object-cover',
    placeholderClass: ''
  }
)

const hasError = ref(false)

const handleError = () => {
  hasError.value = true
}
</script>

