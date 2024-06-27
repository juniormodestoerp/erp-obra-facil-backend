import { PrismaTagsRepository } from '@modules/tags/repositories/prisma/repositories/prisma-tags-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { FetchTagsUseCase } from '@modules/tags/use-cases/fetch-tags-use-case'

export function makeFetchTagsUseCase() {
	const tagsRepository = new PrismaTagsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchTagsUseCase(tagsRepository, usersRepository)
}
