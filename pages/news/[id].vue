<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <LoadingSpinner v-if="pending" message="Loading article..." />

    <ErrorMessage 
      v-else-if="error"
      title="⚠️ Error Loading Article"
      :message="error.statusCode === 429 
        ? 'API rate limit reached. Please wait a few minutes before trying again.' 
        : error.message"
    >
      <template #action>
        <BackButton to="/">Back to News</BackButton>
      </template>
    </ErrorMessage>

    <article v-else-if="article" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
      <!-- Header -->
      <div class="mb-8">
        <BackButton to="/" class="mb-6">Back to News</BackButton>
        
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {{ article.title }}
        </h1>
        
        <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span class="font-semibold text-primary">{{ article.source_name }}</span>
          <span>•</span>
          <span>{{ formattedDate }}</span>
        </div>

        <div v-if="article.category && article.category.length > 0" class="flex flex-wrap gap-2">
          <span
            v-for="(category, index) in article.category"
            :key="index"
            class="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
          >
            {{ category }}
          </span>
        </div>
      </div>

      <!-- Image -->
      <ArticleImage 
        :src="article.image_url ?? undefined"
        :alt="article.title"
        :icon-size="96"
        container-class="w-full max-h-[500px] rounded-xl overflow-hidden mb-8 bg-gray-200 dark:bg-gray-700"
        image-class="w-full h-full object-cover"
        placeholder-class="min-h-[400px]"
      />

      <!-- Body -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <div v-if="article.description" class="text-xl font-medium text-gray-900 dark:text-white mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <p>{{ article.description }}</p>
        </div>

        <div v-if="article.content" class="text-lg text-gray-700 dark:text-gray-300 mb-8">
          <p>{{ article.content }}</p>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <a
            v-if="article.link"
            :href="article.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            Read full article on {{ article.source_name }}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </article>

    <div v-else class="max-w-md mx-auto text-center py-20">
      <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Article Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">The article you're looking for doesn't exist.</p>
        <BackButton to="/">Back to News</BackButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsArticle } from '~/types/news'
import { logger } from '~/utils/logger'

const route = useRoute()
const { newsApiService } = useNewsApi()

const articleId = route.params.id as string

const { data, pending, error } = await useAsyncData<NewsArticle>(
  `news-detail-${articleId}`,
  async () => {
    try {
      logger.info('Fetching article details', { articleId })
      const response = await newsApiService.getNewsById(articleId)
      
      if (!response.results || response.results.length === 0) {
        throw new Error('Article not found')
      }
      
      return response.results[0]
    } catch (err) {
      logger.error('Failed to load article', err as Error, { articleId })
      throw err
    }
  },
  {
    server: true,
    lazy: false,
    dedupe: 'defer',
    getCachedData: (key) => {
      return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
    }
  }
)

const article = computed(() => data.value)

const formattedDate = computed(() => {
  if (!article.value) return ''
  const date = new Date(article.value.pubDate)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
})

useHead({
  title: () => article.value ? `${article.value.title} - News Website` : 'Article - News Website',
  meta: [
    {
      name: 'description',
      content: () => article.value?.description || 'Read the full article'
    },
    {
      property: 'og:title',
      content: () => article.value?.title || 'News Article'
    },
    {
      property: 'og:description',
      content: () => article.value?.description || ''
    },
    {
      property: 'og:image',
      content: () => article.value?.image_url || ''
    }
  ]
})
</script>
