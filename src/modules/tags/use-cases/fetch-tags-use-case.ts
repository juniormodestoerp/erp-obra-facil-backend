import { AppError } from '@core/domain/errors/app-error'

import type { Tag } from '@modules/tags/entities/tag'
import type { DomainTagsRepository } from '@modules/tags/repositories/domain-tags-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	userId: string
}

interface Output {
	tags: Tag[]
}

export class FetchTagsUseCase {
	constructor(
		private readonly tagsRepository: DomainTagsRepository,
		private readonly usersRepository: DomainUsersRepository,
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
