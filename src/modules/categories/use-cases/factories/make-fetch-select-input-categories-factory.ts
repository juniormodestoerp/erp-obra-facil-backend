import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/categories-repository'

import { FetchSelectInputCategoriesUseCase } from '@modules/categories/use-cases/fetch-select-input-categories-use-case'

export function makeFetchSelectInputCategoriesUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository()

	return new FetchSelectInputCategoriesUseCase(categoriesRepository)
}
