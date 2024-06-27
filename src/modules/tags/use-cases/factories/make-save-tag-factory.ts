import { PrismaTagsRepository } from '@modules/tags/repositories/prisma/repositories/tags-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-repository'

import { SaveTagUseCase } from '@modules/tags/use-cases/save-tag-use-case'

export function makeSaveTagUseCase() {
	const tagsRepository = new PrismaTagsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveTagUseCase(tagsRepository, usersRepository)
}
