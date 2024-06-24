import type { Category as RawCategory } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Category, CategoryType } from '@modules/categories/entities/category'

export class PrismaCategoriesMapper {
	static toPrisma(category: Category): RawCategory {
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
