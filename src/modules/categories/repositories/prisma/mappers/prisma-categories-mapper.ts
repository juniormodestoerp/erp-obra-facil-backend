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
			id: category.id,
			userId: category.userId,
			transactionId: category.transactionId,
			type: category.type,
			name: category.name,
			subcategoryOf: category.subcategoryOf,
			createdAt: category.createdAt,
			updatedAt: category.updatedAt,
			deletedAt: category.deletedAt,
		}
	}

	static toDomain(raw: RawCategory): Category {
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
			},
			new UniqueEntityID(raw.id),
		)
	}
}
