import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { PrismaAccountsMapper } from '@modules/accounts/repositories/prisma/mappers/prisma-accounts-mapper'
import { PrismaCategoriesMapper } from '@modules/categories/repositories/prisma/mappers/prisma-categories-mapper'
import { PrismaCentersMapper } from '@modules/centers/repositories/prisma/mappers/prisma-centers-mapper'
import { PrismaMethodsMapper } from '@modules/methods/repositories/prisma/mappers/prisma-methods-mapper'
import { PrismaTagsMapper } from '@modules/tags/repositories/prisma/mappers/prisma-tags-mapper'
import { Transaction } from '@modules/transactions/entities/transaction'
import { PrismaUsersMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'
import type {
	Account as RawAccount,
	Category as RawCategory,
	Center as RawCenter,
	Method as RawMethod,
	Tag as RawTag,
	Transaction as RawTransaction,
	User as RawUser,
} from '@prisma/client'

export class PrismaTransactionsMapper {
	static toPrisma(transaction: Transaction) {
		return {
			id: transaction.id,
			userId: transaction.userId,
			accountId: transaction.accountId,
			categoryId: transaction.categoryId,
			centerId: transaction.centerId,
			methodId: transaction.methodId,
			type: transaction.type,
			date: transaction.date,
			amount: transaction.amount,
			description: transaction.description,
			status: transaction.status,
			card: transaction.card,
			contact: transaction.contact,
			project: transaction.project,
			documentNumber: transaction.documentNumber,
			notes: transaction.notes,
			competenceDate: transaction.competenceDate,
			createdAt: transaction.createdAt,
			updatedAt: transaction.updatedAt,
			deletedAt: transaction.deletedAt,
			tags: {
				connect: transaction.tags.map((tag) => ({
					id: tag.id,
				})),
			},
		}
	}

	static toDomain(
		raw: RawTransaction & {
			user: RawUser
			account: RawAccount
			category: RawCategory
			center: RawCenter | null
			method: RawMethod | null
			tags: RawTag[]
		},
	): Transaction {
		return Transaction.create(
			{
				userId: raw.userId,
				accountId: raw.accountId,
				categoryId: raw.categoryId,
				centerId: raw.centerId,
				methodId: raw.methodId,
				type: raw.type,
				date: new Date(raw.date),
				amount: raw.amount,
				description: raw.description,
				status: raw.status,
				card: raw.card,
				contact: raw.contact,
				project: raw.project,
				documentNumber: raw.documentNumber,
				notes: raw.notes,
				competenceDate: raw.competenceDate
					? new Date(raw.competenceDate)
					: null,
				createdAt: new Date(raw.createdAt),
				updatedAt: new Date(raw.updatedAt),
				deletedAt: raw.deletedAt ? new Date(raw.deletedAt) : null,
				user: raw.user ? PrismaUsersMapper.toDomain(raw.user) : null,
				account: raw.account
					? PrismaAccountsMapper.toDomain(raw.account)
					: null,
				category: raw.category
					? PrismaCategoriesMapper.toDomain(raw.category)
					: null,
				center: raw.center ? PrismaCentersMapper.toDomain(raw.center) : null,
				method: raw.method ? PrismaMethodsMapper.toDomain(raw.method) : null,
				tags: raw.tags
					? raw.tags.map((tag: any) => PrismaTagsMapper.toDomain(tag))
					: [],
			},
			new UniqueEntityID(raw.id),
		)
	}
}
