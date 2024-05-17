import { Category } from '@modules/categories/entities/category'
import { UserViewModel } from '@modules/users/http/view-models/user-view-model'

export class CategoryViewModel {
  static toHTTP(category: Category) {
    return {
      id: category.id,
      userId: category.userId,
      categoryId: category.categoryId,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      deletedAt: category.deletedAt,
      user: category.user ? UserViewModel.toHTTP(category.user) : undefined,
      relatedCategories: category.relatedCategories
        ? category.relatedCategories.map((relatedCategory) =>
            CategoryViewModel.mapCategory(relatedCategory),
          )
        : undefined,
      categories: category.categories
        ? CategoryViewModel.mapCategory(category.categories)
        : undefined,
    }
  }

  static mapCategory(category: Category) {
    return {
      id: category.id,
      categoryId: category.categoryId,
      userId: category.userId,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
    }
  }
}
