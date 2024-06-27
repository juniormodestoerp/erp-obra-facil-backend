import { AppError } from '@core/domain/errors/app-error'

import type { DomainAccountsRepository } from '@modules/accounts/repositories/domain-accounts-repository'

interface Input {
	id: string
}

export class RemoveAccountUseCase {
	constructor(
		private readonly bankDomainAccountsRepository: DomainAccountsRepository,
	) {}

	async execute({ id }: Input): Promise<void> {
		const account = await this.bankDomainAccountsRepository.findById(id)

		if (!account) {
			throw new AppError({
				code: 'bank_account.not_found',
			})
		}

		await this.bankDomainAccountsRepository.remove(id)
	}
}
