import { AppError } from '@core/domain/errors/app-error'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'
import type { DomainCategoriesRepository } from '@modules/categories/repositories/domain-categories-repository'

interface Output {
	categories: ISelectInputDTO[]
}

export class FetchSelectInputCategoriesUseCase {
	constructor(
		private readonly categoriesRepository: DomainCategoriesRepository,
	) {}

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
