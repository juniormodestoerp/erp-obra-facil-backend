import { UserSendVerificationCodeForgotPassword } from '@modules/user/jobs/send-verification-code-forgot-password'

import { UserSendVerificationCodeEmail } from '@modules/user/jobs/send-verification-code-email'

export const jobs = {
  UserSendVerificationCodeEmail: {
    key: 'UserSendVerificationCodeEmail',
    job: new UserSendVerificationCodeEmail(),
  },
  UserSendVerificationCodeForgotPassword: {
    key: 'UserSendVerificationCodeForgotPassword',
    job: new UserSendVerificationCodeForgotPassword(),
  },
}
