import { AppError } from '@core/domain/errors/app-error'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'
import type { BankAccountsRepository } from '@modules/accounts/repositories/bank-accounts-repository'

interface Output {
	bankAccounts: ISelectInputDTO[]
}

export class FetchSelectInputBankAccountsUseCase {
	constructor(
		private readonly bankAccountsRepository: BankAccountsRepository,
	) {}

	async execute(): Promise<Output> {
		const bankAccounts = await this.bankAccountsRepository.selectInput()

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
