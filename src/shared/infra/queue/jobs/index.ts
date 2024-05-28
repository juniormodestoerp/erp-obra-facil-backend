import { SendForgotPasswordCode } from '@modules/users/jobs/send-forgot-password-code'

export const jobs = {
	SendForgotPasswordCode: {
		key: 'SendForgotPasswordCode',
		job: new SendForgotPasswordCode(),
	},
}
