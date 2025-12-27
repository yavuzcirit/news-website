import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NewsCard from '../NewsCard.vue'

describe('NewsCard', () => {
  const defaultProps = {
    to: '/news/123',
    title: 'Test News Title',
    source: 'Test Source',
    date: '2024-12-27T20:00:00Z',
    description: 'This is a test news description'
  }

  it('renders news card correctly', () => {
    const wrapper = mount(NewsCard, {
      props: defaultProps,
      global: {
        stubs: {
          NuxtLink: {
            template: '<div><slot /></div>'
          },
          ArticleImage: {
            template: '<div class="article-image"></div>'
          }
        }
      }
    })
    
    expect(wrapper.text()).toContain('Test News Title')
    expect(wrapper.text()).toContain('Test Source')
    expect(wrapper.text()).toContain('This is a test news description')
  })

  it('formats date correctly', () => {
    const wrapper = mount(NewsCard, {
      props: defaultProps,
      global: {
        stubs: {
          NuxtLink: {
            template: '<div><slot /></div>'
          },
          ArticleImage: true
        }
      }
    })
    
    expect(wrapper.text()).toMatch(/Dec|December/)
    expect(wrapper.text()).toContain('2024')
  })

  it('truncates long description', () => {
    const longDescription = 'A'.repeat(200)
    const wrapper = mount(NewsCard, {
      props: {
        ...defaultProps,
        description: longDescription
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<div><slot /></div>'
          },
          ArticleImage: true
        }
      }
    })
    
    const text = wrapper.text()
    expect(text.length).toBeLessThan(longDescription.length + 50)
    expect(text).toContain('...')
  })

  it('renders without description', () => {
    const wrapper = mount(NewsCard, {
      props: {
        ...defaultProps,
        description: undefined
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<div><slot /></div>'
          },
          ArticleImage: true
        }
      }
    })
    
    expect(wrapper.text()).toContain('Test News Title')
    expect(wrapper.text()).toContain('Test Source')
  })

  it('passes image URL to ArticleImage component', () => {
    const wrapper = mount(NewsCard, {
      props: {
        ...defaultProps,
        imageUrl: 'https://example.com/image.jpg'
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<div><slot /></div>'
          },
          ArticleImage: true
        }
      }
    })
    
    const articleImage = wrapper.findComponent({ name: 'ArticleImage' })
    expect(articleImage.exists()).toBe(true)
  })
})

