export * from '@shared/infra/providers/template/@react-email/send-forgot-password-code'

export interface ISendForgotPasswordVariables {
	name: string
	userEmail: string
	resetPasswordLink: string
}
