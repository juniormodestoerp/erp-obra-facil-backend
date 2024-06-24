import { AppError } from '@core/domain/errors/app-error'

import type { TagsRepository } from '@modules/tags/repositories/tags-repository'

interface Input {
	id: string
}

export class RemoveTagUseCase {
	constructor(
		private readonly tagsRepository: TagsRepository,
	) {}

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
