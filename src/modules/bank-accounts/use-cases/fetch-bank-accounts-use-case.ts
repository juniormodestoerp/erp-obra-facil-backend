import { AppError } from '@core/domain/errors/app-error'

import type { BankAccount } from '@modules/bank-accounts/entities/bank-account'
import type { BankAccountsRepository } from '@modules/bank-accounts/repositories/bank-accounts-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	userId: string
}

interface Output {
	bankAccounts: BankAccount[]
}

export class FetchBankAccountsUseCase {
	constructor(
		private readonly bankAccountsRepository: BankAccountsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({ userId }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const bankAccounts = await this.bankAccountsRepository.findMany(userId)

		if (bankAccounts.length === 0) {
			throw new AppError({
				code: 'bank_account.not_found',
			})
		}

		return {
			bankAccounts,
		}
	}
}
