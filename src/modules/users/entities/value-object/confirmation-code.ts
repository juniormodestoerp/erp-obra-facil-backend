import { AppError } from '@core/domain/errors/app-error'

export class ConfirmationCode {
	private confirmationCode: string

	get value(): string {
		return this.confirmationCode
	}

	private isConfirmationCodeLengthValid(confirmationCode: string): boolean {
		return confirmationCode.length === 6
	}

	private isOnlyDigitsInConfirmationCode(confirmationCode: string): boolean {
		return /^\d+$/.test(confirmationCode)
	}

	private validate(confirmationCode: string): void {
		if (
			!this.isConfirmationCodeLengthValid(confirmationCode) ||
			!this.isOnlyDigitsInConfirmationCode(confirmationCode)
		) {
			throw new AppError({
				code: 'confirmation_code.invalid',
			})
		}
	}

	constructor(confirmationCode: string) {
		this.validate(confirmationCode)

		this.confirmationCode = confirmationCode
	}
}
