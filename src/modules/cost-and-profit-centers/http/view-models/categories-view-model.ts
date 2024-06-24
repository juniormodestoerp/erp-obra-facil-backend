import type { Category } from '@modules/categories/entities/category'

export class CategoriesViewModel {
	static toHTTP(category: Category) {
		return {
			id: category.id,
			userId: category.userId,
			categoryId: category.categoryId,
			categoryName: category.name,
			subcategoryName: category.subcategory,
			model: category.model,
			type: category.type,
			createdAt: category.createdAt,
		}
	}
}
