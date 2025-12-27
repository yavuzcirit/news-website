<template>
  <NuxtLink
    :to="to"
    external
    class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <!-- Image -->
    <ArticleImage 
      :src="imageUrl" 
      :alt="title"
      container-class="w-full h-48 bg-gray-200 dark:bg-gray-700"
      image-class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />

    <!-- Content -->
    <div class="p-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
        {{ title }}
      </h2>
      
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
        <span class="font-semibold text-primary">{{ source }}</span>
        <span>•</span>
        <span>{{ formattedDate }}</span>
      </div>

      <p v-if="description" class="text-gray-600 dark:text-gray-400 line-clamp-3">
        {{ truncatedDescription }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  to: string
  imageUrl?: string
  title: string
  source: string
  date: string
  description?: string
}>()

const formattedDate = computed(() => {
  const date = new Date(props.date)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
})

const truncatedDescription = computed(() => {
  if (!props.description) return ''
  const maxLength = 150
  if (props.description.length <= maxLength) return props.description
  return props.description.slice(0, maxLength) + '...'
})
</script>

