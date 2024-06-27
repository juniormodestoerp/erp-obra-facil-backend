import { AppError } from '@core/domain/errors/app-error'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'
import type { DomainAccountsRepository } from '@modules/accounts/repositories/domain-accounts-repository'

interface Output {
	bankAccounts: ISelectInputDTO[]
}

export class FetchSelectInputAccountsUseCase {
	constructor(
		private readonly bankDomainAccountsRepository: DomainAccountsRepository,
	) {}

	async execute(): Promise<Output> {
		const bankAccounts = await this.bankDomainAccountsRepository.selectInput()

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
