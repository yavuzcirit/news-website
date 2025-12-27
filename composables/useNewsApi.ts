import NewsApiService from '~/services/newsApi'

export const useNewsApi = () => {
  const config = useRuntimeConfig()
  
  const newsApiService = new NewsApiService(
    config.public.newsApiBaseUrl as string,
    config.public.newsApiKey as string
  )

  return {
    newsApiService
  }
}

