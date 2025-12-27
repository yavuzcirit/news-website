import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ArticleImage from '../ArticleImage.vue'

describe('ArticleImage', () => {
  it('renders image when src is provided', () => {
    const wrapper = mount(ArticleImage, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Test Image'
      }
    })
    
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
    expect(img.attributes('alt')).toBe('Test Image')
  })

  it('shows placeholder when src is not provided', () => {
    const wrapper = mount(ArticleImage, {
      props: {
        alt: 'Test'
      }
    })
    
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.text()).toContain('News Article')
  })

  it('shows placeholder with custom text', () => {
    const wrapper = mount(ArticleImage, {
      props: {
        placeholderText: 'No Image Available'
      }
    })
    
    expect(wrapper.text()).toContain('No Image Available')
  })

  it('applies custom container classes', () => {
    const customClass = 'custom-container-class'
    const wrapper = mount(ArticleImage, {
      props: {
        containerClass: customClass
      }
    })
    
    expect(wrapper.classes()).toContain('custom-container-class')
  })

  it('uses custom icon size', () => {
    const wrapper = mount(ArticleImage, {
      props: {
        iconSize: 128
      }
    })
    
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('128')
    expect(svg.attributes('height')).toBe('128')
  })

  it('handles image error by setting hasError to true', async () => {
    const wrapper = mount(ArticleImage, {
      props: {
        src: 'https://example.com/broken-image.jpg',
        alt: 'Test'
      }
    })
    
    const img = wrapper.find('img')
    await img.trigger('error')
    
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})

