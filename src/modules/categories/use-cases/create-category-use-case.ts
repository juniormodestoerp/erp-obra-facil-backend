import { AppError } from '@core/domain/errors/app-error'

import { CategoriesRepository } from '@modules/categories/repositories/categories-repository'

interface Input {
  id: string
  userId: string
}

interface Output void

export class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute({ id, userId }: Input): Promise<Output> {
    const clinic = await this.categoriesRepository.findById({
      id,
      userId,
    })

    if (!clinic) {
      throw new AppError({
        code: 'category.not_found',
      })
    }

    await this.categoriesRepository.remove(id)
  }
}
