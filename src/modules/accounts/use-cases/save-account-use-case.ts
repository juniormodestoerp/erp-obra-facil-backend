import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Account, type LimitType } from '@modules/accounts/entities/account'
import type { DomainAccountsRepository } from '@modules/accounts/repositories/domain-accounts-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	id: string
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

export class SaveAccountUseCase {
	constructor(
		private readonly bankDomainAccountsRepository: DomainAccountsRepository,
		private readonly usersRepository: DomainUsersRepository,
	) {}

	async execute({
		id,
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
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const previusAccount = await this.bankDomainAccountsRepository.findById(id)

		if (!previusAccount) {
			throw new AppError({
				code: 'bank_account.not_found',
			})
		}

		const account = Account.create(
			{
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
			},
			new UniqueEntityID(id),
		)

		await this.bankDomainAccountsRepository.save(account)

		return {
			account,
		}
	}
}
