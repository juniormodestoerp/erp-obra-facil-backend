import { AppError } from '@core/domain/errors/app-error'

import { CategoriesRepository } from '@modules/categories/repositories/categories-repository'

interface Input {
  userId: string
  id: string
}

export class RemoveCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute({ id, userId }: Input): Promise<void> {
    const category = await this.categoriesRepository.findById({
      userId,
      id,
    })

    console.log(id, category)

    if (!category) {
      throw new AppError({
        code: 'category.not_found',
      })
    }

    console.log(id)

    await this.categoriesRepository.remove({
      userId,
      id,
    })
  }
}
