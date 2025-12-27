import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorMessage from '../ErrorMessage.vue'

describe('ErrorMessage', () => {
  it('renders error message correctly', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        title: 'Error Title',
        message: 'Something went wrong',
        showRetry: false
      }
    })
    
    expect(wrapper.text()).toContain('Error Title')
    expect(wrapper.text()).toContain('Something went wrong')
  })

  it('shows retry button when showRetry is true', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error occurred',
        showRetry: true
      }
    })
    
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toContain('Try Again')
  })

  it('emits retry event when button is clicked', async () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error occurred',
        showRetry: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('retry')).toBeTruthy()
    expect(wrapper.emitted('retry')?.length).toBe(1)
  })

  it('does not show retry button when showRetry is false', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error occurred',
        showRetry: false
      }
    })
    
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('renders custom action slot', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Error occurred'
      },
      slots: {
        action: '<button class="custom-btn">Custom Action</button>'
      }
    })
    
    expect(wrapper.find('.custom-btn').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom Action')
  })
})

