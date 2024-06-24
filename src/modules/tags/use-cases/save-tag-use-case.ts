import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Tag } from '@modules/tags/entities/tag'
import type { TagsRepository } from '@modules/tags/repositories/tags-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	userId: string
	name: string
}

interface Output {
	tag: Tag
}

export class SaveTagUseCase {
	constructor(
		private readonly tagsRepository: TagsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({
		id,
		userId,
		name,
	}: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const previusTag = await this.tagsRepository.findById(id)

		if (!previusTag) {
			throw new AppError({
				code: 'tag.not_found',
			})
		}

		const tag = Tag.create(
			{
				userId,
				name,
				createdAt: previusTag.createdAt,
				updatedAt: new Date(),
				deletedAt: previusTag.deletedAt,
			},
			new UniqueEntityID(id),
		)

		await this.tagsRepository.save(tag)

		return {
			tag,
		}
	}
}
