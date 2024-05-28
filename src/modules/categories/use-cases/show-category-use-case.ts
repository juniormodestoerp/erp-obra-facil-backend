import { AppError } from '@core/domain/errors/app-error'

import type { Category } from '@modules/categories/entities/category'
import type { CategoriesRepository } from '@modules/categories/repositories/categories-repository'

interface Input {
	userId: string
	id: string
}

interface Output {
	category: Category
}

export class ShowCategoryUseCase {
	constructor(private readonly categoriesRepository: CategoriesRepository) {}

	async execute({ id, userId }: Input): Promise<Output> {
		const category = await this.categoriesRepository.findById({
			userId,
			id,
		})

		if (!category) {
			throw new AppError({
				code: 'category.not_found',
			})
		}

		return {
			category,
		}
	}
}
