import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/categories-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-repository'

import { FetchCategoriesUseCase } from '@modules/categories/use-cases/fetch-categories-use-case'

export function makeFetchCategoriesUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchCategoriesUseCase(categoriesRepository, usersRepository)
}
