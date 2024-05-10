import { resend } from '@shared/infra/providers/mail/resend'
import { QueueProps, Runnable } from '@shared/infra/providers/queue'
import { SendForgotPasswordTemplate } from '@shared/infra/providers/template'
import { jobs } from '@shared/infra/queue/jobs'

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

    ;(async function () {
      const { error } = await resend.emails.send({
        from: 'bruno.clara@yahoo.com',
        to: email,
        subject: '[Obra Fácil] Link para recuperação de senha',
        react: SendForgotPasswordTemplate({
          name,
          userEmail: email,
          resetPasswordLink,
        }),
      })

      if (error) {
        return console.error({ error })
      }
    })()
  }
}
