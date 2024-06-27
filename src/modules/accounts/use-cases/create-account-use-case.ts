import { AppError } from '@core/domain/errors/app-error'

import { Account, type LimitType } from '@modules/accounts/entities/account'
import type { DomainAccountsRepository } from '@modules/accounts/repositories/domain-accounts-repository'

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
	account: Account
}

export class CreateAccountUseCase {
	constructor(
		private readonly bankDomainAccountsRepository: DomainAccountsRepository,
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
		const existsAccount = await this.bankDomainAccountsRepository.findByName({
			userId,
			name,
		})

		if (existsAccount) {
			throw new AppError({
				code: 'bank_account.already_exists',
			})
		}

		const account = Account.create({
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

		await this.bankDomainAccountsRepository.create(account)

		return {
			account,
		}
	}
}
