import { AppError } from '@core/domain/errors/app-error'

import type { BankAccountsRepository } from '@modules/accounts/repositories/bank-accounts-repository'

interface Input {
	id: string
}

export class RemoveBankAccountUseCase {
	constructor(
		private readonly bankAccountsRepository: BankAccountsRepository,
	) {}

	async execute({ id }: Input): Promise<void> {
		const account = await this.bankAccountsRepository.findById(id)

		if (!account) {
			throw new AppError({
				code: 'bank_account.not_found',
			})
		}

		await this.bankAccountsRepository.remove(id)
	}
}
