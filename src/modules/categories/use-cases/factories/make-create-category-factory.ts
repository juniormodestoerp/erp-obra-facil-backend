import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/categories-respository'

import { CreateCategoryUseCase } from '@modules/categories/use-cases/remove-category-use-case'

export function makeCreateCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()

  return new CreateCategoryUseCase(categoriesRepository)
}
