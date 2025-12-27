<template>
  <NuxtLink 
    :to="to" 
    :external="external"
    class="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <slot>Back</slot>
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    to: string
    external?: boolean
  }>(),
  {
    external: true
  }
)
</script>

