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

			// relatedCategories: category.relatedCategories
			//   ? category.relatedCategories.map((relatedCategory) =>
			//       CategoriesViewModel.mapCategory(relatedCategory),
			//     )
			//   : undefined,
			// categories: category.categories
			//   ? CategoriesViewModel.mapCategory(category.categories)
			//   : undefined,
		}
	}
	// static mapCategory(category: Category) {
	//   return {
	//     id: category.id,
	//     categoryId: category.categoryId,
	//     userId: category.userId,
	//     name: category.name,
	//     subcategory: category.subcategory,
	//     model: category.model,
	//     type: category.type,
	//     createdAt: category.createdAt,
	//   }
	// }
}
