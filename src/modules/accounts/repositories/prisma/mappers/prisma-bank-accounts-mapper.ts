import type { Account as RawBankAccount } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Account, LimitType } from '@modules/accounts/entities/account'

export class PrismaAccountsMapper {
	static toPrisma(account: Account): RawBankAccount {
		return {
			id: account.id,
			userId: account.userId,
			accountType: account.accountType,
			name: account.name,
			currency: account.currency,
			logo: account.logo,
			limit: account.limit,
			limitType: account.limitType,
			dueDateDay: account.dueDateDay,
			dueDateFirstInvoice: account.dueDateFirstInvoice
				? new Date(account.dueDateFirstInvoice)
				: null,
			closingDateInvoice: account.closingDateInvoice,
			balanceFirstInvoice: account.balanceFirstInvoice,
			isFirstInvoice: account.isFirstInvoice,
			isCreditCard: account.isCreditCard,
			initialBalance: account.initialBalance,
			createdAt: account.createdAt,
			updatedAt: account.updatedAt,
			deletedAt: account.deletedAt,
		}
	}

	static toDomain(raw: RawBankAccount): Account {
		return Account.create(
			{
				userId: raw.userId,
				accountType: raw.accountType,
				name: raw.name,
				currency: raw.currency,
				logo: raw.logo,
				limit: raw.limit,
				limitType: LimitType[raw.limitType as keyof typeof LimitType],
				dueDateDay: raw.dueDateDay,
				dueDateFirstInvoice: raw.dueDateFirstInvoice
					? raw.dueDateFirstInvoice?.toISOString()
					: null,
				closingDateInvoice: raw.closingDateInvoice,
				balanceFirstInvoice: raw.balanceFirstInvoice,
				isFirstInvoice: raw.isFirstInvoice,
				isCreditCard: raw.isCreditCard,
				initialBalance: raw.initialBalance,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
				user: null,
				transactions: [],
			},
			new UniqueEntityID(raw.id),
		)
	}
}
