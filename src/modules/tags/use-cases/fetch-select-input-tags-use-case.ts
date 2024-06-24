import { AppError } from '@core/domain/errors/app-error'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'
import type { TagsRepository } from '@modules/tags/repositories/tags-repository'

interface Output {
	tags: ISelectInputDTO[]
}

export class FetchSelectInputTagsUseCase {
	constructor(
		private readonly tagsRepository: TagsRepository,
	) {}

	async execute(): Promise<Output> {
		const tags = await this.tagsRepository.selectInput()

		if (tags.length === 0) {
			throw new AppError({
				code: 'tag.not_found',
			})
		}

		return {
			tags,
		}
	}
}
