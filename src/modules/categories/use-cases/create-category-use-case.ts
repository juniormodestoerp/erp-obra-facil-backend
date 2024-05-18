import { AppError } from '@core/domain/errors/app-error'

import { CategoriesRepository } from '@modules/categories/repositories/categories-repository'
import { Category } from '../entities/category'

interface Input {
  userId: string
  categoryId?: string
  name: string
  description: string
}

interface Output {
  category: Category
}

export class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute({
    userId,
    categoryId,
    name,
    description,
  }: Input): Promise<Output> {
    const existsCategory = await this.categoriesRepository.findByName({
      userId,
      name,
    })

    if (!existsCategory) {
      throw new AppError({
        code: 'category.already_exists',
      })
    }

    const category = Category.create({
      userId,
      categoryId,
      name,
      description,
    })

    await this.categoriesRepository.create(category)

    return {
      category,
    }
  }
}
