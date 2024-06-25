import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { PrismaBankAccountsMapper } from '@modules/bank-accounts/repositories/prisma/mappers/prisma-bank-accounts-mapper'
import { PrismaCategoriesMapper } from '@modules/categories/repositories/prisma/mappers/prisma-categories-mapper'
import { PrismaCostAndProfitCentersMapper } from '@modules/cost-and-profit-centers/repositories/prisma/mappers/prisma-cost-and-profit-centers-mapper'
import { PrismaPaymentMethodsMapper } from '@modules/payment-methods/repositories/prisma/mappers/prisma-payment-methods-mapper'
import { PrismaTagsMapper } from '@modules/tags/repositories/prisma/mappers/prisma-tags-mapper'
import { Transaction } from '@modules/transactions/entities/transaction'
import { PrismaUserMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'
import type {
	Transaction as RawTransaction,
	User as RawUser,
	Category as RawCategory,
	BankAccount as RawBankAccount,
	CostAndProfitCenter as RawCenter,
	PaymentMethod as RawMethod,
	Tag as RawTag,
} from '@prisma/client'

export class PrismaTransactionsMapper {
	static toPrisma(transaction: Transaction) {
		return {
			id: transaction.id,
			userId: transaction.userId,
			amount: transaction.amount,
			description: transaction.description,
			transferAccount: transaction.transferAccount,
			card: transaction.card,
			contact: transaction.contact,
			project: transaction.project,
			documentNumber: transaction.documentNumber,
			notes: transaction.notes,
			competenceDate: transaction.competenceDate,
			createdAt: transaction.createdAt,
			updatedAt: transaction.updatedAt,
			deletedAt: transaction.deletedAt,
			categoryId: transaction.category?.id,
			accountId: transaction.account?.id,
			centerId: transaction.center?.id,
			methodId: transaction.method?.id,
		}
	}

	static toDomain(
		raw: RawTransaction & {
			user: RawUser
			category: RawCategory
			account: RawBankAccount
			center: RawCenter
			method: RawMethod
			tags: RawTag[]
		},
	): Transaction {
		return Transaction.create(
			{
				userId: raw.userId,
				amount: raw.amount,
				description: raw.description,
				transferAccount: raw.transferAccount,
				card: raw.card,
				contact: raw.contact,
				project: raw.project,
				documentNumber: raw.documentNumber,
				notes: raw.notes,
				competenceDate: raw.competenceDate,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
				user: PrismaUserMapper.toDomain(raw.user),
				account: PrismaBankAccountsMapper.toDomain(raw.account),
				category: PrismaCategoriesMapper.toDomain(raw.category),
				center: PrismaCostAndProfitCentersMapper.toDomain(raw.center),
				method: PrismaPaymentMethodsMapper.toDomain(raw.method),
				tags: raw.tags.map(PrismaTagsMapper.toDomain),
			},
			new UniqueEntityID(raw.id),
		)
	}
}
