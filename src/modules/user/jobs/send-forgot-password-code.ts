import { resend } from '@shared/infra/providers/mail/resend'
import { jobs } from '@shared/infra/queue/jobs'
import { SendForgotPasswordTemplate } from '@shared/infra/providers/template'
import { QueueProps, Runnable } from '@shared/infra/providers/queue'

interface DataJob {
  email: string
  name: string
  resetPasswordLink: string
}

export class SendForgotPasswordCode extends Runnable {
  get key() {
    return jobs.SendForgotPasswordCode.key
  }

  async run({ data }: QueueProps): Promise<void> {
    const { name, email, resetPasswordLink } = data as DataJob

    await resend.emails.send({
      from: 'Obra Fácil <nao-responda@erpobrafacil.com>',
      to: email,
      subject: '[Obra Fácil] Link para recuperação de senha',
      react: SendForgotPasswordTemplate({
        name,
        userEmail: email,
        resetPasswordLink,
      }),
    })
  }
}
