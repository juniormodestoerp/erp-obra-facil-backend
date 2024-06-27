import { PrismaTagsRepository } from '@modules/tags/repositories/prisma/repositories/tags-repository'

import { ShowTagUseCase } from '@modules/tags/use-cases/show-tag-use-case'

export function makeShowTagUseCase() {
	const tagsRepository = new PrismaTagsRepository()

	return new ShowTagUseCase(tagsRepository)
}
