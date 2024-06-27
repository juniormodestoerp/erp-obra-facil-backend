import type {
	Category as RawCategory,
	Transaction as RawTransaction,
	User as RawUser,
} from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Category, CategoryType } from '@modules/categories/entities/category'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'
import { PrismaUsersMapper } from '@modules/users/repositories/prisma/mappers/prisma-users-mapper'

export class PrismaCategoriesMapper {
	static toPrisma(category: Category): any {
		return {
			id: category.id.toString(),
			userId: category.userId,
			transactionId: category.transactionId,
			type: category.type,
			name: category.name,
			subcategoryOf: category.subcategoryOf,
			createdAt: category.createdAt,
			updatedAt: category.updatedAt,
			deletedAt: category.deletedAt,
			user: category.user
				? { connect: { id: category.user.id.toString() } }
				: undefined,
			transactions:
				category.transactions.length > 0
					? {
							connect: category.transactions.map((transaction) => ({
								id: transaction.id.toString(),
							})),
						}
					: undefined,
		}
	}

	static toDomain(
		raw: RawCategory & {
			user: RawUser
			transactions?: RawTransaction[]
		},
	): Category {
		const user = raw.user ? PrismaUsersMapper.toDomain(raw.user) : null

		const transactions = raw.transactions
			? raw.transactions.map((transaction: RawTransaction) => {
					return PrismaTransactionsMapper.toDomain(transaction)
				})
			: []

		return Category.create(
			{
				userId: raw.userId,
				transactionId: raw.transactionId,
				type: CategoryType[raw.type as keyof typeof CategoryType],
				name: raw.name,
				subcategoryOf: raw.subcategoryOf,
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
