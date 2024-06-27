import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { RemoveUserUseCase } from '@modules/users/use-cases/remove-user-use-case'

export function makeRemoveUserUseCase() {
	const usersRepository = new PrismaUsersRepository()

	return new RemoveUserUseCase(usersRepository)
}
