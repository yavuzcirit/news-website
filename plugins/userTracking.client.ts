import { logger } from '~/utils/logger'

export default defineNuxtPlugin(() => {
  const { getUserId } = useUserTracking()
  
  logger.setUserTrackingIdGetter(getUserId)
  
  if (import.meta.client) {
    logger.info('User session started', {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`
    })
  }
})

