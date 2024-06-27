import { AppError } from '@core/domain/errors/app-error'

import { Tag } from '@modules/tags/entities/tag'
import type { DomainTagsRepository } from '@modules/tags/repositories/domain-tags-repository'

interface Input {
	userId: string
	name: string
}

interface Output {
	tag: Tag
}

export class CreateTagUseCase {
	constructor(private readonly tagsRepository: DomainTagsRepository) {}

	async execute({ userId, name }: Input): Promise<Output> {
		const existsTag = await this.tagsRepository.findByName(name)

		if (existsTag) {
			throw new AppError({
				code: 'tag.already_exists',
			})
		}

		const tag = Tag.create({
			userId,
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})

		await this.tagsRepository.create(tag)

		return {
			tag,
		}
	}
}
