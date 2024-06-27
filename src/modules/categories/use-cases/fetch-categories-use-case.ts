import { AppError } from '@core/domain/errors/app-error'

import type { Category } from '@modules/categories/entities/category'
import type { DomainCategoriesRepository } from '@modules/categories/repositories/domain-categories-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	userId: string
}

interface Output {
	categories: Category[]
}

export class FetchCategoriesUseCase {
	constructor(
		private readonly categoriesRepository: DomainCategoriesRepository,
		private readonly usersRepository: DomainUsersRepository,
	) {}

	async execute({ userId }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const categories = await this.categoriesRepository.findMany(userId)

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
