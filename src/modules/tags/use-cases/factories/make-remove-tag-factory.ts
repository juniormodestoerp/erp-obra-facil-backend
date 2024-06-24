import { PrismaTagsRepository } from '@modules/tags/repositories/prisma/repositories/tags-respository'

import { RemoveTagUseCase } from '@modules/tags/use-cases/remove-tag-use-case'

export function makeRemoveTagUseCase() {
	const tagsRepository = new PrismaTagsRepository()

	return new RemoveTagUseCase(tagsRepository)
}
