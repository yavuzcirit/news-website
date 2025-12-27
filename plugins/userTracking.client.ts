import { logger } from '~/utils/logger'

export default defineNuxtPlugin(() => {
  // Initialize user tracking
  const { getUserId } = useUserTracking()
  
  // Set user tracking ID getter in logger
  logger.setUserTrackingIdGetter(getUserId)
  
  // Log user session start
  if (import.meta.client) {
    logger.info('User session started', {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`
    })
  }
})

