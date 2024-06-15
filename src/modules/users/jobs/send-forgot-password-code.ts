import { resend } from '@shared/infra/providers/mail/resend'
import { type QueueProps, Runnable } from '@shared/infra/providers/queue'
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
		;(async () => {
			const { error, data } = await resend.emails.send({
				from: 'contato@vilefort-dev.com.br',
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
