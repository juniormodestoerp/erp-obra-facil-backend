import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-repository'

import { SaveUserUseCase } from '@modules/users/use-cases/save-user-use-case'

export function makeSaveUserUseCase() {
	const usersRepository = new PrismaUsersRepository()

	return new SaveUserUseCase(usersRepository)
}
