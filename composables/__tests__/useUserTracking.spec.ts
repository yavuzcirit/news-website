import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref, readonly } from 'vue'

const mockCookieValue = ref<string | null>(null)

// @ts-expect-error - Mock globals for testing
global.useCookie = vi.fn(() => mockCookieValue)
// @ts-expect-error - Mock globals for testing
global.readonly = readonly

import { useUserTracking } from '../useUserTracking'

describe('useUserTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCookieValue.value = null
  })

  it('generates a user ID if one does not exist', () => {
    const { getUserId } = useUserTracking()
    
    const userId = getUserId()
    
    expect(userId).toBeDefined()
    expect(userId).toMatch(/^user_\d+_[a-z0-9]+$/)
  })

  it('generates consistent format for user ID', () => {
    const { getUserId } = useUserTracking()
    
    const userId = getUserId()
    
    expect(userId).toContain('user_')
    expect(userId.split('_')).toHaveLength(3)
  })

  it('getUserId returns the tracking ID', () => {
    const { getUserId } = useUserTracking()
    
    const id1 = getUserId()
    const id2 = getUserId()
    
    expect(id1).toBe(id2)
  })

  it('resetUserId generates a new ID', () => {
    const { getUserId, resetUserId } = useUserTracking()
    
    const originalId = getUserId()
    resetUserId()
    const newId = getUserId()
    
    expect(originalId).not.toBe(newId)
    expect(newId).toMatch(/^user_\d+_[a-z0-9]+$/)
  })
})
