import { AppError } from '@core/domain/errors/app-error'

import type { Account } from '@modules/accounts/entities/account'
import type { BankAccountsRepository } from '@modules/accounts/repositories/bank-accounts-repository'

interface Input {
	id: string
}

interface Output {
	account: Account
}

export class ShowBankAccountUseCase {
	constructor(
		private readonly bankAccountsRepository: BankAccountsRepository,
	) {}

	async execute({ id }: Input): Promise<Output> {
		const account = await this.bankAccountsRepository.findById(id)

		if (!account) {
			throw new AppError({
				code: 'bank_account.not_found',
			})
		}

		return {
			account,
		}
	}
}
