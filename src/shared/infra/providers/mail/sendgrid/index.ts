/* eslint-disable no-use-before-define */
import { env } from '@shared/infra/config/env'
import sgMail from '@sendgrid/mail'

import { ISendMail, Mail } from '@shared/infra/providers/mail'

export class SendGrid implements Mail {
  private mail: typeof sgMail
  private static instance: SendGrid

  private constructor() {
    this.mail = sgMail

    this.mail.setApiKey(env.SEND_GRID_KEY)
  }

  static getInstance(): SendGrid {
    if (!SendGrid.instance) {
      SendGrid.instance = new SendGrid()
    }

    return SendGrid.instance
  }

  async sendMail(data: ISendMail): Promise<void> {
    const message = {
      to: data.to,
      from: data.from,
      subject: data.subject,
      html: data.email,
    }

    this.mail
      .send(message)
      .then(() => {
        console.log('Email sent [SendGrid]')
      })
      .catch((error) => {
        console.error(error.response.body)
      })
  }
}
