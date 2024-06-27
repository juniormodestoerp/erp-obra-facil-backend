import { AppError } from '@core/domain/errors/app-error'

import type { DomainTagsRepository } from '@modules/tags/repositories/domain-tags-repository'

interface Input {
	id: string
}

export class RemoveTagUseCase {
	constructor(private readonly tagsRepository: DomainTagsRepository) {}

	async execute({ id }: Input): Promise<void> {
		const tag = await this.tagsRepository.findById(id)

		if (!tag) {
			throw new AppError({
				code: 'tag.not_found',
			})
		}

		await this.tagsRepository.remove(id)
	}
}
