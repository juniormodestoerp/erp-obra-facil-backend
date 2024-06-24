import { AppError } from '@core/domain/errors/app-error'

import { BankAccount } from '@modules/bank-accounts/entities/bank-account'
import type { BankAccountsRepository } from '@modules/bank-accounts/repositories/bank-accounts-repository'

interface Input {
	userId: string
	name: string
	currency: string
	logo: string
	initialBalance: number
}

interface Output {
	bankAccount: BankAccount
}

export class CreateBankAccountUseCase {
	constructor(
		private readonly bankAccountsRepository: BankAccountsRepository,
	) {}

	async execute({
		userId,
		name,
		currency,
		logo,
		initialBalance,
	}: Input): Promise<Output> {
		const existsBankAccount = await this.bankAccountsRepository.findByName({
			userId,
			name,
		})

		if (existsBankAccount) {
			throw new AppError({
				code: 'bank_account.already_exists',
			})
		}

		const bankAccount = BankAccount.create({
			userId,
			name,
			currency,
			logo,
			initialBalance,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			user: null,
			transactions: [],
		})

		await this.bankAccountsRepository.create(bankAccount)

		return {
			bankAccount,
		}
	}
}