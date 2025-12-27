import { describe, it, expect, beforeEach, vi } from 'vitest'

// @ts-expect-error - Mock global for testing
global.useRuntimeConfig = vi.fn(() => ({
  public: {
    newsApiBaseUrl: 'https://api.test.com',
    newsApiKey: 'test-api-key'
  }
}))

vi.mock('~/services/newsApi', () => ({
  default: class MockNewsApiService {
    constructor(public baseUrl: string, public apiKey: string) {}
    
    getLatestNews() {
      return Promise.resolve({
        results: [],
        nextPage: null
      })
    }
    
    getNewsById(id: string) {
      return Promise.resolve({
        results: [{
          article_id: id,
          title: 'Test Article',
          source_name: 'Test Source'
        }]
      })
    }
  }
}))

import { useNewsApi } from '../useNewsApi'

describe('useNewsApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates news API service with correct configuration', () => {
    const { newsApiService } = useNewsApi()
    
    expect(newsApiService).toBeDefined()
    expect(typeof newsApiService.getLatestNews).toBe('function')
    expect(typeof newsApiService.getNewsById).toBe('function')
  })

  it('newsApiService has required methods', () => {
    const { newsApiService } = useNewsApi()
    
    expect(typeof newsApiService.getLatestNews).toBe('function')
    expect(typeof newsApiService.getNewsById).toBe('function')
  })

  it('can fetch latest news', async () => {
    const { newsApiService } = useNewsApi()
    
    const result = await newsApiService.getLatestNews()
    
    expect(result).toHaveProperty('results')
    expect(Array.isArray(result.results)).toBe(true)
  })

  it('can fetch news by ID', async () => {
    const { newsApiService } = useNewsApi()
    
    const result = await newsApiService.getNewsById('test-123')
    
    expect(result).toHaveProperty('results')
    expect(result.results).toHaveLength(1)
    expect(result.results[0].article_id).toBe('test-123')
  })
})
