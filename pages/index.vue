<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <PageHeader 
      title="Latest News"
      subtitle="Stay updated with the latest headlines"
    />

    <LoadingSpinner v-if="pending" message="Loading news..." />

    <ErrorMessage 
      v-else-if="error" 
      title="⚠️ Error Loading News"
      :message="error.statusCode === 429 
        ? 'API rate limit reached. Please wait a few minutes before trying again.' 
        : error.message"
      :show-retry="error.statusCode !== 429"
      @retry="refresh"
    />

    <template v-else-if="data?.results && data.results.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <NewsCard
          v-for="article in data.results"
          :key="article.article_id"
          :to="`/news/${article.article_id}`"
          :image-url="article.image_url ?? undefined"
          :title="article.title"
          :source="article.source_name"
          :date="article.pubDate"
          :description="article.description ?? undefined"
        />
      </div>

      <Pagination
        :page-label="currentPageNumber"
        :has-previous="hasPreviousPage"
        :has-next="!!data.nextPage"
        :loading="pending"
        @previous="handlePreviousPage"
        @next="handleNextPage"
      />
    </template>

    <div v-else class="text-center py-20">
      <p class="text-lg text-gray-600 dark:text-gray-400">No news articles found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsApiResponse } from '~/types/news'
import { logger } from '~/utils/logger'

const { newsApiService } = useNewsApi()
const { currentPage, goToNextPage, goToPreviousPage, hasPreviousPage, pageNumber } = usePagination()

const currentPageNumber = computed(() => `Page ${pageNumber.value}`)

const { data, pending, error, refresh } = await useAsyncData<NewsApiResponse>(
  () => `news-list-${currentPage.value || 'home'}`,
  async () => {
    try {
      logger.info('Fetching news for page', { page: currentPage.value })
      const response = await newsApiService.getLatestNews({
        page: currentPage.value,
        size: 10
      })
      return response
    } catch (err) {
      logger.error('Failed to load news list', err as Error)
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

const handleNextPage = async () => {
  if (data.value?.nextPage) {
    await goToNextPage(data.value.nextPage)
  }
}

const handlePreviousPage = async () => {
  await goToPreviousPage()
}

useHead({
  title: 'Latest News - News Website',
  meta: [
    {
      name: 'description',
      content: 'Browse the latest news articles from around the world'
    }
  ]
})
</script>

