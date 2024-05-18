import { AppError } from '@core/domain/errors/app-error'

import { Category } from '@modules/categories/entities/category'
import { CategoriesRepository } from '@modules/categories/repositories/categories-repository'
import { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
  pageIndex: number
  userId: string
}

interface Output {
  categories: Category[]
  totalCount: number
}

export class FetchCategoriesUseCase {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ pageIndex, userId }: Input): Promise<Output> {
    const user = await this.usersRepository.findById({
      userId,
    })

    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    const categories = await this.categoriesRepository.findMany({
      pageIndex,
      userId,
    })

    if (categories.length === 0) {
      throw new AppError({
        code: 'category.not_found',
      })
    }

    const totalCount = await this.categoriesRepository.count()

    return {
      categories,
      totalCount,
    }
  }
}
