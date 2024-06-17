import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Category } from '@modules/categories/entities/category'
import { PrismaUserMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'
import type { Category as RawCategory, User as RawUser } from '@prisma/client'

export class PrismaCategoriesMapper {
	static toPrisma(category: Category): RawCategory {
		return {
			id: category.id,
			userId: category.userId,
			categoryId: category.categoryId,
			name: category.name,
			subcategory: category.subcategory,
			type: category.type,
			model: category.model,
			createdAt: category.createdAt,
			updatedAt: category.updatedAt,
			deletedAt: category.deletedAt,
			// user: category.user
			// 	? PrismaUserMapper.toPrisma(category.user)
			// 	: null,
			categories: category.categories
				? PrismaCategoriesMapper.toPrisma(category.categories)
				: null,
			relatedCategories: category.relatedCategories.map((rc) =>
				PrismaCategoriesMapper.toPrisma(rc),
			),
		}
	}

	static toDomain(
		raw: RawCategory & {
			user: RawUser | null
			categories: RawCategory | null
			relatedCategories: RawCategory[]
		},
	): Category {
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
				deletedAt: raw.deletedAt,
				user: raw.user ? PrismaUserMapper.toDomain(raw.user) : null,
				categories: raw.categories
					? PrismaCategoriesMapper.toDomain(raw.categories)
					: null,
				relatedCategories: raw.relatedCategories.map((relatedCategory) =>
					PrismaCategoriesMapper.toDomain(relatedCategory),
				),
			},
			new UniqueEntityID(raw.id),
		)
	}
}
