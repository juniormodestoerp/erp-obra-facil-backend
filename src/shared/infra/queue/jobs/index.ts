import { SendForgotPasswordCode } from '@modules/user/jobs/send-forgot-password-code'

export const jobs = {
  SendForgotPasswordCode: {
    key: 'SendForgotPasswordCode',
    job: new SendForgotPasswordCode(),
  },
}
