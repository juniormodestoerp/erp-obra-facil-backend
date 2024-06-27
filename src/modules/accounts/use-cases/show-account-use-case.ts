import { AppError } from '@core/domain/errors/app-error'

import type { Account } from '@modules/accounts/entities/account'
import type { DomainAccountsRepository } from '@modules/accounts/repositories/domain-accounts-repository'

interface Input {
	id: string
}

interface Output {
	account: Account
}

export class ShowAccountUseCase {
	constructor(
		private readonly bankDomainAccountsRepository: DomainAccountsRepository,
	) {}

	async execute({ id }: Input): Promise<Output> {
		const account = await this.bankDomainAccountsRepository.findById(id)

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
