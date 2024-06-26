import { AppError } from '@core/domain/errors/app-error'

import { BankAccount, type LimitType } from '@modules/bank-accounts/entities/bank-account'
import type { BankAccountsRepository } from '@modules/bank-accounts/repositories/bank-accounts-repository'

interface Input {
	userId: string
	accountType: string
	name: string
	currency: string
	logo: string | null
	limit: number | null
	limitType: LimitType | null
	dueDateDay: string | null
	dueDateFirstInvoice: string | null
	closingDateInvoice: number | null
	balanceFirstInvoice: number | null
	isFirstInvoice: boolean | null
	isCreditCard: boolean | null
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
		accountType,
		name,
		currency,
		logo,
		limit,
		limitType,
		dueDateDay,
		dueDateFirstInvoice,
		closingDateInvoice,
		balanceFirstInvoice,
		isFirstInvoice,
		isCreditCard,
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
			accountType,
			name,
			currency,
			logo,
			limit,
			limitType,
			dueDateDay,
			dueDateFirstInvoice,
			closingDateInvoice,
			balanceFirstInvoice,
			isFirstInvoice,
			isCreditCard,
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
