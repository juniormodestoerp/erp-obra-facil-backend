import { AppError } from '@core/domain/errors/app-error'

import { ISelectInputDTO } from '@modules/categories/dtos/select-input-dto'
import { CategoriesRepository } from '@modules/categories/repositories/categories-repository'

interface Output {
  categories: ISelectInputDTO[]
}

export class FetchSelectInputCategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<Output> {
    const categories = await this.categoriesRepository.selectInput()

    if (categories.length === 0) {
      throw new AppError({
        code: 'category.not_found',
      })
    }

    return {
      categories,
    }
  }
}
