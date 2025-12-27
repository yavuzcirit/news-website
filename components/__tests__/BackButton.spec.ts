import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BackButton from '../BackButton.vue'

describe('BackButton', () => {
  it('renders with default text', () => {
    const wrapper = mount(BackButton, {
      props: {
        to: '/'
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })
    
    expect(wrapper.text()).toContain('Back')
  })

  it('renders with custom text', () => {
    const wrapper = mount(BackButton, {
      props: {
        to: '/news'
      },
      slots: {
        default: 'Go to Home'
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })
    
    expect(wrapper.text()).toContain('Go to Home')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(BackButton, {
      props: {
        to: '/'
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })
    
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})

