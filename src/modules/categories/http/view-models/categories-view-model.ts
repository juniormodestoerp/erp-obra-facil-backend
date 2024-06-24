import type { Category } from '@modules/categories/entities/category'

export class CategoriesViewModel {
	static toHTTP(category: Category) {
		return {
			id: category.id,
			type: category.type,
			name: category.name,
			subcategoryOf: category.subcategoryOf,
			createdAt: category.createdAt,
		}
	}
}
