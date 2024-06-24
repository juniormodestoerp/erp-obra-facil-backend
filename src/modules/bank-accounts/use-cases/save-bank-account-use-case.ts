import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { BankAccount } from '@modules/bank-accounts/entities/bank-account'
import type { BankAccountsRepository } from '@modules/bank-accounts/repositories/bank-accounts-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	userId: string
	name: string
	currency: string
	logo: string
	initialBalance: number
}

interface Output {
	bankAccount: BankAccount
}

export class SaveBankAccountUseCase {
	constructor(
		private readonly bankAccountsRepository: BankAccountsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({
		id,
		userId,
		name,
		currency,
		logo,
		initialBalance,
	}: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const previusBankAccount = await this.bankAccountsRepository.findById(id)

		if (!previusBankAccount) {
			throw new AppError({
				code: 'bank_account.not_found',
			})
		}

		const bankAccount = BankAccount.create(
			{
				userId,
				name,
				currency,
				logo,
				initialBalance,
				createdAt: previusBankAccount.createdAt,
				updatedAt: new Date(),
				deletedAt: previusBankAccount.deletedAt,
				user,
				transactions: previusBankAccount.transactions,
			},
			new UniqueEntityID(id),
		)

		await this.bankAccountsRepository.save(bankAccount)

		return {
			bankAccount,
		}
	}
}
