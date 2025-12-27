export interface NewsArticle {
  article_id: string
  title: string
  description: string | null
  link: string
  image_url: string | null
  source_id: string
  source_name: string
  pubDate: string
  content: string | null
  category: string[]
  country: string[]
  language: string
}

export interface NewsApiResponse {
  status: string
  totalResults: number
  results: NewsArticle[]
  nextPage: string | null
}

export interface PaginationParams {
  page?: string | null
  size?: number
}

export interface NewsDetailParams {
  id: string
}

