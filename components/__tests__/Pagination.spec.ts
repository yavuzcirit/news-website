import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../Pagination.vue'

describe('Pagination', () => {
  it('renders pagination buttons', () => {
    const wrapper = mount(Pagination, {
      props: {
        pageLabel: 'Page 1',
        hasPrevious: false,
        hasNext: true,
        loading: false
      }
    })
    
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(wrapper.text()).toContain('Page 1')
  })

  it('disables previous button when hasPrevious is false', () => {
    const wrapper = mount(Pagination, {
      props: {
        pageLabel: 'Page 1',
        hasPrevious: false,
        hasNext: true
      }
    })
    
    const prevButton = wrapper.findAll('button')[0]
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('disables next button when hasNext is false', () => {
    const wrapper = mount(Pagination, {
      props: {
        pageLabel: 'Page 1',
        hasPrevious: true,
        hasNext: false
      }
    })
    
    const nextButton = wrapper.findAll('button')[1]
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('emits previous event when previous button is clicked', async () => {
    const wrapper = mount(Pagination, {
      props: {
        pageLabel: 'Page 2',
        hasPrevious: true,
        hasNext: true
      }
    })
    
    await wrapper.findAll('button')[0].trigger('click')
    
    expect(wrapper.emitted('previous')).toBeTruthy()
    expect(wrapper.emitted('previous')?.length).toBe(1)
  })

  it('emits next event when next button is clicked', async () => {
    const wrapper = mount(Pagination, {
      props: {
        pageLabel: 'Page 1',
        hasPrevious: false,
        hasNext: true
      }
    })
    
    await wrapper.findAll('button')[1].trigger('click')
    
    expect(wrapper.emitted('next')).toBeTruthy()
    expect(wrapper.emitted('next')?.length).toBe(1)
  })

  it('shows loading spinner when loading is true', () => {
    const wrapper = mount(Pagination, {
      props: {
        pageLabel: 'Page 1',
        hasPrevious: true,
        hasNext: true,
        loading: true
      }
    })
    
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })

  it('shows page label when loading is false', () => {
    const wrapper = mount(Pagination, {
      props: {
        pageLabel: 'Page 5',
        hasPrevious: true,
        hasNext: true,
        loading: false
      }
    })
    
    expect(wrapper.text()).toContain('Page 5')
  })
})

