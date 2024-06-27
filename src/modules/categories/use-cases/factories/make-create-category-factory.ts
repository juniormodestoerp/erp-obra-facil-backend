import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/prisma-categories-repository'

import { CreateCategoryUseCase } from '@modules/categories/use-cases/create-category-use-case'

export function makeCreateCategoryUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository()

	return new CreateCategoryUseCase(categoriesRepository)
}
