import env from '#start/env'
import logger from '@adonisjs/core/services/logger'
import type { Emails } from '@adonisjs/core/types'
import type { Message } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'

const APP_URL = env.get('APP_URL')
const NO_REPLY_EMAIL = env.get('NO_REPLY_EMAIL', 'do_not_reply@example.com')

class EmailService {
  public static listeners = new Map<keyof Emails, Function>()
  static on<T extends keyof Emails>(
    type: T,
    handler: (message: Message, data: Emails[T], options: {}) => void,
  ) {
    EmailService.listeners.set(type, handler)
  }

  static async send<T extends keyof Emails>(emailType: T, data: Emails[T], options?: {}) {
    const handler = EmailService.listeners.get(emailType)
    if (!handler) {
      throw new Error(`No handler registered for email type: ${String(emailType)}`)
    }

    await mail.sendLater((message) => {
      message.from(NO_REPLY_EMAIL)
      handler(message, data)
    })
    logger.info(`Email ${String(emailType)} sent successfully`)
  }
}

export default EmailService
