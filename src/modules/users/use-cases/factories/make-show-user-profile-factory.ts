import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { ShowUserProfileUseCase } from '@modules/users/use-cases/show-user-profile-use-case'

export function makeShowUserProfileUseCase() {
	const usersRepository = new PrismaUsersRepository()

	return new ShowUserProfileUseCase(usersRepository)
}
