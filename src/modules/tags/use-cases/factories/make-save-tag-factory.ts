import { PrismaTagsRepository } from '@modules/tags/repositories/prisma/repositories/prisma-tags-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-respository'

import { SaveTagUseCase } from '@modules/tags/use-cases/save-tag-use-case'

export function makeSaveTagUseCase() {
	const tagsRepository = new PrismaTagsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveTagUseCase(tagsRepository, usersRepository)
}
