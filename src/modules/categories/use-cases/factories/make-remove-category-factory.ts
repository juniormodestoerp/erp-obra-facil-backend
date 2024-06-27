import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/prisma-categories-repository'

import { RemoveCategoryUseCase } from '@modules/categories/use-cases/remove-category-use-case'

export function makeRemoveCategoryUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository()

	return new RemoveCategoryUseCase(categoriesRepository)
}
