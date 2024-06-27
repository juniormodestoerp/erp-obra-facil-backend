import { PrismaUserFilesRepository } from '@modules/users/repositories/prisma/repositories/prisma-user-files-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { UpdateProfilePictureUseCase } from '@modules/users/use-cases/update-profile-picture-use-case'

export function makeUpdateProfilePictureUseCase() {
	const usersRepository = new PrismaUsersRepository()
	const userFilesRepository = new PrismaUserFilesRepository()

	return new UpdateProfilePictureUseCase(usersRepository, userFilesRepository)
}
