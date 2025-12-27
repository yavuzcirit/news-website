import type { ApiError } from '~/types/logger'
import { logger } from '~/utils/logger'

export class FetcherError extends Error {
  statusCode?: number
  context?: Record<string, unknown>

  constructor(message: string, statusCode?: number, context?: Record<string, unknown>) {
    super(message)
    this.name = 'FetcherError'
    this.statusCode = statusCode
    this.context = context
  }
}

interface FetcherOptions extends RequestInit {
  params?: Record<string, string | number | null | undefined>
  timeout?: number
}

class Fetcher {
  private baseURL: string
  private defaultTimeout: number = 30000

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | null | undefined>): string {
    const url = new URL(`${this.baseURL}${endpoint}`)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    return url.toString()
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')
    
    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`
      let errorData: unknown = null

      try {
        if (contentType?.includes('application/json')) {
          errorData = await response.json()
          errorMessage = (errorData as { message?: string })?.message || errorMessage
        } else {
          errorMessage = await response.text()
        }
      } catch {
        // If parsing fails, use default error message
      }

      logger.error('Fetch request failed', new Error(errorMessage), {
        status: response.status,
        url: response.url,
        errorData
      })

      throw new FetcherError(errorMessage, response.status, { errorData })
    }

    try {
      if (contentType?.includes('application/json')) {
        return await response.json() as T
      }
      return await response.text() as T
    } catch (error) {
      logger.error('Failed to parse response', error as Error)
      throw new FetcherError('Failed to parse response', response.status)
    }
  }

  async get<T>(endpoint: string, options?: FetcherOptions): Promise<T> {
    const url = this.buildURL(endpoint, options?.params)
    const timeout = options?.timeout || this.defaultTimeout
    const startTime = Date.now()

    const requestId = logger.httpRequest('GET', url, { params: options?.params })

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...options,
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        }
      })

      clearTimeout(timeoutId)
      const duration = Date.now() - startTime

      const data = await this.handleResponse<T>(response)
      
      logger.httpResponse(requestId, 'GET', url, response.status, duration, {
        dataSize: JSON.stringify(data).length
      })
      
      return data
    } catch (error) {
      const duration = Date.now() - startTime

      if (error instanceof FetcherError) {
        throw error
      }

      if ((error as Error).name === 'AbortError') {
        const timeoutError = new FetcherError('Request timeout', 408, { url })
        logger.httpError(requestId, 'GET', url, timeoutError, { duration, timeout })
        throw timeoutError
      }

      const networkError = new FetcherError('Network error occurred', undefined, { 
        originalError: (error as Error).message 
      })
      logger.httpError(requestId, 'GET', url, error as Error, { duration })
      throw networkError
    }
  }

  async post<T>(endpoint: string, body?: unknown, options?: FetcherOptions): Promise<T> {
    const url = this.buildURL(endpoint, options?.params)
    const timeout = options?.timeout || this.defaultTimeout
    const startTime = Date.now()

    const requestId = logger.httpRequest('POST', url, { body, params: options?.params })

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...options,
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        },
        body: body ? JSON.stringify(body) : undefined
      })

      clearTimeout(timeoutId)
      const duration = Date.now() - startTime

      const data = await this.handleResponse<T>(response)
      
      logger.httpResponse(requestId, 'POST', url, response.status, duration, {
        dataSize: JSON.stringify(data).length
      })
      
      return data
    } catch (error) {
      const duration = Date.now() - startTime

      if (error instanceof FetcherError) {
        throw error
      }

      if ((error as Error).name === 'AbortError') {
        const timeoutError = new FetcherError('Request timeout', 408, { url })
        logger.httpError(requestId, 'POST', url, timeoutError, { duration, timeout })
        throw timeoutError
      }

      const networkError = new FetcherError('Network error occurred', undefined, { 
        originalError: (error as Error).message 
      })
      logger.httpError(requestId, 'POST', url, error as Error, { duration })
      throw networkError
    }
  }
}

export default Fetcher

