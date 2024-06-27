import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/prisma-categories-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-respository'

import { SaveCategoryUseCase } from '@modules/categories/use-cases/save-category-use-case'

export function makeSaveCategoryUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveCategoryUseCase(categoriesRepository, usersRepository)
}
