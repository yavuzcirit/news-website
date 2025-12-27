import type { LogEntry, LogLevel } from '~/types/logger'

interface RequestLogContext {
  method?: string
  url?: string
  statusCode?: number
  duration?: number
  requestId?: string
  userId?: string
  userTrackingId?: string
  [key: string]: unknown
}

class Logger {
  private isDevelopment: boolean
  private requestCounter: number
  private getUserTrackingId: (() => string) | null = null

  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production'
    this.requestCounter = 0
  }

  // Set user tracking ID getter (called from app)
  setUserTrackingIdGetter(getter: () => string): void {
    this.getUserTrackingId = getter
  }

  private getCurrentUserTrackingId(): string | undefined {
    try {
      return this.getUserTrackingId?.()
    } catch {
      return undefined
    }
  }

  private generateRequestId(): string {
    this.requestCounter++
    return `req_${Date.now()}_${this.requestCounter}`
  }

  private getLogColor(level: LogLevel): string {
    const colors = {
      DEBUG: '\x1b[36m',  
      INFO: '\x1b[32m',    
      WARN: '\x1b[33m',   
      ERROR: '\x1b[31m'    
    }
    return colors[level] || '\x1b[0m'
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString()
    const color = this.getLogColor(entry.level)
    const reset = '\x1b[0m'
    const bold = '\x1b[1m'
    
    let message = `${color}${bold}[${entry.level}]${reset} ${color}[${timestamp}]${reset} ${entry.message}`
    
    if (entry.context) {
      const ctx = entry.context as RequestLogContext
      if (ctx.method && ctx.url) {
        message += ` ${bold}${ctx.method}${reset} ${ctx.url}`
      }
      if (ctx.statusCode) {
        const statusColor = ctx.statusCode < 400 ? '\x1b[32m' : '\x1b[31m'
        message += ` ${statusColor}${ctx.statusCode}${reset}`
      }
      if (ctx.duration) {
        message += ` ${ctx.duration}ms`
      }
      if (ctx.requestId) {
        message += ` [${ctx.requestId}]`
      }
      if (ctx.userTrackingId) {
        message += ` 👤[${ctx.userTrackingId}]`
      }
    }
    
    return message
  }

  private formatContext(context?: Record<string, unknown>): string {
    if (!context) return ''
    
    // Remove already displayed fields from context
    const filteredContext = { ...context }
    delete filteredContext.method
    delete filteredContext.url
    delete filteredContext.statusCode
    delete filteredContext.duration
    delete filteredContext.requestId
    delete filteredContext.userTrackingId
    
    if (Object.keys(filteredContext).length === 0) return ''
    
    return JSON.stringify(filteredContext, null, 2)
  }

  private log(entry: LogEntry): void {
    const formatted = this.formatMessage(entry)
    const contextStr = this.formatContext(entry.context)

    switch (entry.level) {
      case 'DEBUG':
        if (this.isDevelopment) {
          console.debug(formatted)
          if (contextStr) console.debug('Context:', contextStr)
        }
        break
      case 'INFO':
        console.info(formatted)
        if (contextStr) console.info('Context:', contextStr)
        break
      case 'WARN':
        console.warn(formatted)
        if (contextStr) console.warn('Context:', contextStr)
        break
      case 'ERROR':
        console.error(formatted)
        if (entry.error) {
          console.error('Error:', entry.error)
          if (entry.error.stack) {
            console.error('Stack:', entry.error.stack)
          }
        }
        if (contextStr) console.error('Context:', contextStr)
        break
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    const userTrackingId = this.getCurrentUserTrackingId()
    this.log({
      level: 'DEBUG' as LogLevel,
      message,
      timestamp: new Date(),
      context: userTrackingId ? { ...context, userTrackingId } : context
    })
  }

  info(message: string, context?: Record<string, unknown>): void {
    const userTrackingId = this.getCurrentUserTrackingId()
    this.log({
      level: 'INFO' as LogLevel,
      message,
      timestamp: new Date(),
      context: userTrackingId ? { ...context, userTrackingId } : context
    })
  }

  warn(message: string, context?: Record<string, unknown>): void {
    const userTrackingId = this.getCurrentUserTrackingId()
    this.log({
      level: 'WARN' as LogLevel,
      message,
      timestamp: new Date(),
      context: userTrackingId ? { ...context, userTrackingId } : context
    })
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    const userTrackingId = this.getCurrentUserTrackingId()
    this.log({
      level: 'ERROR' as LogLevel,
      message,
      timestamp: new Date(),
      error,
      context: userTrackingId ? { ...context, userTrackingId } : context
    })
  }

  
  httpRequest(method: string, url: string, context?: Record<string, unknown>): string {
    const requestId = this.generateRequestId()
    const userTrackingId = this.getCurrentUserTrackingId()
    this.info(`HTTP Request Started`, {
      method,
      url,
      requestId,
      userTrackingId,
      ...context
    })
    return requestId
  }

  httpResponse(
    requestId: string,
    method: string,
    url: string,
    statusCode: number,
    duration: number,
    context?: Record<string, unknown>
  ): void {
    const level = statusCode >= 400 ? 'ERROR' : 'INFO'
    const message = statusCode >= 400 ? 'HTTP Request Failed' : 'HTTP Request Completed'
    const userTrackingId = this.getCurrentUserTrackingId()
    
    this.log({
      level: level as LogLevel,
      message,
      timestamp: new Date(),
      context: {
        method,
        url,
        statusCode,
        duration,
        requestId,
        userTrackingId,
        ...context
      }
    })
  }

  httpError(
    requestId: string,
    method: string,
    url: string,
    error: Error,
    context?: Record<string, unknown>
  ): void {
    const userTrackingId = this.getCurrentUserTrackingId()
    this.error('HTTP Request Error', error, {
      method,
      url,
      requestId,
      userTrackingId,
      ...context
    })
  }

  performance(label: string, duration: number, context?: Record<string, unknown>): void {
    const level = duration > 1000 ? 'WARN' : 'INFO'
    this.log({
      level: level as LogLevel,
      message: `Performance: ${label}`,
      timestamp: new Date(),
      context: {
        duration,
        ...context
      }
    })
  }

  group(label: string): void {
    if (this.isDevelopment) {
      console.group(`📦 ${label}`)
    }
  }

  groupEnd(): void {
    if (this.isDevelopment) {
      console.groupEnd()
    }
  }
}

export const logger = new Logger()
