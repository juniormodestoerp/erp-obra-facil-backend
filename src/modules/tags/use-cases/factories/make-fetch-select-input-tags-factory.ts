import { PrismaTagsRepository } from '@modules/tags/repositories/prisma/repositories/tags-respository'

import { FetchSelectInputTagsUseCase } from '@modules/tags/use-cases/fetch-select-input-tags-use-case'

export function makeFetchSelectInputTagsUseCase() {
	const tagsRepository = new PrismaTagsRepository()

	return new FetchSelectInputTagsUseCase(tagsRepository)
}
