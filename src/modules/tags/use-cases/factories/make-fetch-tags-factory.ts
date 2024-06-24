import { PrismaTagsRepository } from '@modules/tags/repositories/prisma/repositories/tags-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { FetchTagsUseCase } from '@modules/tags/use-cases/fetch-tags-use-case'

export function makeFetchTagsUseCase() {
	const tagsRepository = new PrismaTagsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchTagsUseCase(tagsRepository, usersRepository)
}
