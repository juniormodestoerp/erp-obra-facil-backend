import { AppError } from '@core/domain/errors/app-error'

import type { Account } from '@modules/accounts/entities/account'
import type { DomainAccountsRepository } from '@modules/accounts/repositories/domain-accounts-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	userId: string
}

interface Output {
	bankAccounts: Account[]
}

export class FetchAccountsUseCase {
	constructor(
		private readonly bankDomainAccountsRepository: DomainAccountsRepository,
		private readonly usersRepository: DomainUsersRepository,
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

		const bankAccounts =
			await this.bankDomainAccountsRepository.findMany(userId)

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
