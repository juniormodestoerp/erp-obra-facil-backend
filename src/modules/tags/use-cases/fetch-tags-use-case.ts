import { AppError } from '@core/domain/errors/app-error'

import type { Tag } from '@modules/tags/entities/tag'
import type { TagsRepository } from '@modules/tags/repositories/tags-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	userId: string
}

interface Output {
	tags: Tag[]
}

export class FetchTagsUseCase {
	constructor(
		private readonly tagsRepository: TagsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({ userId }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const tags = await this.tagsRepository.findMany(userId)

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
