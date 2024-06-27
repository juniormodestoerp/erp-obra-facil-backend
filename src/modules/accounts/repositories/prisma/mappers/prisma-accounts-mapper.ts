import type {
	Account as RawAccount,
	Transaction as RawTransaction,
	User as RawUser,
} from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Account, LimitType } from '@modules/accounts/entities/account'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'
import { PrismaUsersMapper } from '@modules/users/repositories/prisma/mappers/prisma-users-mapper'

export class PrismaAccountsMapper {
	static toPrisma(account: Account): any {
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
			user: account.user ? { connect: { id: account.user.id } } : null,
			transactions:
				account.transactions.length > 0
					? {
							connect: account.transactions.map((transaction) => ({
								id: transaction.id.toString(),
							})),
						}
					: null,
		}
	}

	static toDomain(
		raw: RawAccount & {
			user: RawUser
			transactions?: RawTransaction[]
		},
	): Account {
		const user = raw.user ? PrismaUsersMapper.toDomain(raw.user) : null

		const transactions = raw.transactions
			? raw.transactions.map((transaction: RawTransaction) => {
					return PrismaTransactionsMapper.toDomain(transaction)
				})
			: []

		return Account.create(
			{
				userId: raw.userId,
				accountType: raw.accountType,
				name: raw.name,
				currency: raw.currency,
				logo: raw.logo,
				limit: raw.limit,
				limitType: raw.limitType
					? LimitType[raw.limitType as keyof typeof LimitType]
					: null,
				dueDateDay: raw.dueDateDay,
				dueDateFirstInvoice: raw.dueDateFirstInvoice
					? new Date(raw.dueDateFirstInvoice)
					: null,
				closingDateInvoice: raw.closingDateInvoice,
				balanceFirstInvoice: raw.balanceFirstInvoice,
				isFirstInvoice: raw.isFirstInvoice,
				isCreditCard: raw.isCreditCard,
				initialBalance: raw.initialBalance,
				createdAt: new Date(raw.createdAt),
				updatedAt: new Date(raw.updatedAt),
				deletedAt: raw.deletedAt ? new Date(raw.deletedAt) : null,
				user,
				transactions,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
