import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Category } from '@modules/categories/entities/category'
import type { Category as RawCategory } from '@prisma/client'

export class PrismaCategoriesMapper {
	static toPrisma(category: Category) {
		return {
			id: category.id.toString(),
			userId: category.userId,
			categoryId: category.categoryId,
			name: category.name,
			subcategory: category.subcategory,
			type: category.type,
			model: category.model,
			createdAt: category.createdAt,
			updatedAt: category.updatedAt,
			deletedAt: category.deletedAt,
		}
	}

	static toDomain(raw: RawCategory): Category {
		return Category.create(
			{
				userId: raw.userId,
				categoryId: raw.categoryId,
				name: raw.name,
				subcategory: raw.subcategory,
				type: raw.type,
				model: raw.model,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt ?? undefined,
				relatedCategories: [],
				categories: undefined,
				user: undefined,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
