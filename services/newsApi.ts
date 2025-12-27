import Fetcher from './fetcher'
import type { NewsApiResponse, PaginationParams } from '~/types/news'
import { logger } from '~/utils/logger'

class NewsApiService {
  private fetcher: Fetcher
  private apiKey: string

  constructor(baseURL: string, apiKey: string) {
    this.fetcher = new Fetcher(baseURL)
    this.apiKey = apiKey
    logger.info('NewsApiService initialized', { baseURL })
  }

  async getLatestNews(params: PaginationParams = {}): Promise<NewsApiResponse> {
    try {
      const queryParams = {
        apikey: this.apiKey,
        size: params.size || 10,
        page: params.page || null
      }

      logger.debug('Fetching latest news', { params: queryParams })

      const response = await this.fetcher.get<NewsApiResponse>('/latest', {
        params: queryParams
      })

      logger.info('Latest news fetched successfully', { 
        totalResults: response.totalResults,
        resultsCount: response.results?.length || 0
      })

      return response
    } catch (error) {
      logger.error('Failed to fetch latest news', error as Error, { params })
      throw error
    }
  }

  async getNewsById(articleId: string): Promise<NewsApiResponse> {
    try {
      const queryParams = {
        apikey: this.apiKey,
        id: articleId
      }

      logger.debug('Fetching news by ID', { articleId })

      const response = await this.fetcher.get<NewsApiResponse>('/latest', {
        params: queryParams
      })

      logger.info('News article fetched successfully', { 
        articleId,
        found: response.results?.length > 0
      })

      return response
    } catch (error) {
      logger.error('Failed to fetch news by ID', error as Error, { articleId })
      throw error
    }
  }
}

export default NewsApiService

