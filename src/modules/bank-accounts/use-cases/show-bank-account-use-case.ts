import { AppError } from '@core/domain/errors/app-error'

import type { BankAccount } from '@modules/bank-accounts/entities/bank-account'
import type { BankAccountsRepository } from '@modules/bank-accounts/repositories/bank-accounts-repository'

interface Input {
	id: string
}

interface Output {
	bankAccount: BankAccount
}

export class ShowBankAccountUseCase {
	constructor(
		private readonly bankAccountsRepository: BankAccountsRepository,
	) {}

	async execute({ id }: Input): Promise<Output> {
		const bankAccount = await this.bankAccountsRepository.findById(id)

		if (!bankAccount) {
			throw new AppError({
				code: 'bank_account.not_found',
			})
		}

		return {
			bankAccount,
		}
	}
}
