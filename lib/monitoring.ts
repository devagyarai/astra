/**
 * Astra Production Monitoring Abstraction
 * 
 * Provides a unified logging facade without vendor lock-in.
 * In development, this outputs to the console.
 * In production, it can be extended to report to Sentry, DataDog, PostHog, etc.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  message: string;
  context?: Record<string, unknown>;
  error?: Error | unknown;
}

class Logger {
  private log(level: LogLevel, payload: LogPayload) {
    const timestamp = new Date().toISOString();
    
    // In a real production app with Sentry/Datadog, we would route errors here.
    // e.g., if (level === 'error') Sentry.captureException(payload.error)

    if (process.env.NODE_ENV === "development" || level === "error") {
      const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] Astra: ${payload.message}`;
      
      switch (level) {
        case "error":
          console.error(formattedMessage, payload.error || "", payload.context || "");
          break;
        case "warn":
          console.warn(formattedMessage, payload.context || "");
          break;
        case "info":
          console.info(formattedMessage, payload.context || "");
          break;
        case "debug":
          console.debug(formattedMessage, payload.context || "");
          break;
      }
    }
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log("info", { message, context });
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log("warn", { message, context });
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    this.log("error", { message, error, context });
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log("debug", { message, context });
  }

  /**
   * Safe wrapper for async boundary operations
   */
  async trackOperation<T>(
    operationName: string, 
    operation: () => Promise<T>, 
    context?: Record<string, unknown>
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await operation();
      const duration = performance.now() - start;
      this.debug(`Operation ${operationName} succeeded in ${Math.round(duration)}ms`, context);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.error(`Operation ${operationName} failed after ${Math.round(duration)}ms`, error, context);
      throw error;
    }
  }
}

export const logger = new Logger();
