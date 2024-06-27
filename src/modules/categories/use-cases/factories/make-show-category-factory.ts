import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/categories-repository'

import { ShowCategoryUseCase } from '@modules/categories/use-cases/show-category-use-case'

export function makeShowCategoryUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository()

	return new ShowCategoryUseCase(categoriesRepository)
}
