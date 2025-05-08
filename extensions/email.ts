declare module '@adonisjs/core/types' {
  interface Emails {
    'simple-send': {
      subject: string
      email: string
      body: string
      from?: string
      replyTo?: string
      name?: string
    }
  }
}
