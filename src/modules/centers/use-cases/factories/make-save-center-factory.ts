import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-respository'

import { SaveCenterUseCase } from '@modules/centers/use-cases/save-center-use-case'

export function makeSaveCenterUseCase() {
	const centersRepository = new PrismaCentersRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveCenterUseCase(centersRepository, usersRepository)
}
