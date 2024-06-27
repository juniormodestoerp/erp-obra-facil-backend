import { AppError } from '@core/domain/errors/app-error'

import type { DomainCategoriesRepository } from '@modules/categories/repositories/domain-categories-repository'

interface Input {
	id: string
}

export class RemoveCategoryUseCase {
	constructor(
		private readonly categoriesRepository: DomainCategoriesRepository,
	) {}

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
