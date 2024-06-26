import { AppError } from '@core/domain/errors/app-error'

import type { Tag } from '@modules/tags/entities/tag'
import type { DomainTagsRepository } from '@modules/tags/repositories/domain-tags-repository'

interface Input {
	id: string
}

interface Output {
	tag: Tag
}

export class ShowTagUseCase {
	constructor(private readonly tagsRepository: DomainTagsRepository) {}

	async execute({ id }: Input): Promise<Output> {
		const tag = await this.tagsRepository.findById(id)

		if (!tag) {
			throw new AppError({
				code: 'tag.not_found',
			})
		}

		return {
			tag,
		}
	}
}
