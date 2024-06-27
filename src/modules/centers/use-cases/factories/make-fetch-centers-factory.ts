import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { FetchCentersUseCase } from '@modules/centers/use-cases/fetch-centers-use-case'

export function makeFetchCentersUseCase() {
	const centersRepository = new PrismaCentersRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchCentersUseCase(centersRepository, usersRepository)
}
