import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Category } from '@modules/categories/entities/category'
import { CategoriesRepository } from '@modules/categories/repositories/categories-repository'
import { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
  id: string
  userId: string
  fieldName: string
  isFieldEnable: boolean
  isFieldRequired: boolean
  title: string
  description: string
}

interface Output {
  category: Category
}

export class SaveCategoryUseCase {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    userId,
    fieldName,
    isFieldEnable,
    isFieldRequired,
    title,
    description,
  }: Input): Promise<Output> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    const category = Category.create(
      {
        userId,
        fieldName,
        isFieldEnable,
        isFieldRequired,
        title,
        description,
      },
      new UniqueEntityID(id),
    )
    await this.categoriesRepository.save(category)

    return {
      category,
    }
  }
}