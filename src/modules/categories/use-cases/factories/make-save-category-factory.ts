import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/categories-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-repository'

import { SaveCategoryUseCase } from '@modules/categories/use-cases/save-category-use-case'

export function makeSaveCategoryUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveCategoryUseCase(categoriesRepository, usersRepository)
}
