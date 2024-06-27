import { PrismaTagsRepository } from '@modules/tags/repositories/prisma/repositories/tags-repository'

import { CreateTagUseCase } from '@modules/tags/use-cases/create-tag-use-case'

export function makeCreateTagUseCase() {
	const tagsRepository = new PrismaTagsRepository()

	return new CreateTagUseCase(tagsRepository)
}
