import { AppError } from '@core/domain/errors/app-error'

import type { CategoriesRepository } from '@modules/categories/repositories/categories-repository'

interface Input {
	id: string
}

export class RemoveCategoryUseCase {
	constructor(private readonly categoriesRepository: CategoriesRepository) {}

	async execute({ id }: Input): Promise<void> {
		const category = await this.categoriesRepository.findById(id)

		if (!category) {
			throw new AppError({
				code: 'category.not_found',
			})
		}

		await this.categoriesRepository.remove(id)
	}
}
