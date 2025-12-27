export const useUserTracking = () => {
  const userTrackingId = useCookie('userTrackingId', {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })

 
  if (!userTrackingId.value) {
    userTrackingId.value = generateUserId()
  }

  function generateUserId(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const random2 = Math.random().toString(36).substring(2, 15)
    return `user_${timestamp}_${random}${random2}`
  }

  function getUserId(): string {
    return userTrackingId.value || generateUserId()
  }

  function resetUserId(): void {
    userTrackingId.value = generateUserId()
  }

  return {
    userId: readonly(userTrackingId),
    getUserId,
    resetUserId
  }
}

