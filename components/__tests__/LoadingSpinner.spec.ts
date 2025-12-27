import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from '../LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders correctly with default message', () => {
    const wrapper = mount(LoadingSpinner)
    
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('renders with custom message', () => {
    const customMessage = 'Loading articles...'
    const wrapper = mount(LoadingSpinner, {
      props: {
        message: customMessage
      }
    })
    
    expect(wrapper.text()).toContain(customMessage)
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(LoadingSpinner)
    
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')
    expect(wrapper.find('.w-16').exists()).toBe(true)
    expect(wrapper.find('.h-16').exists()).toBe(true)
  })
})

