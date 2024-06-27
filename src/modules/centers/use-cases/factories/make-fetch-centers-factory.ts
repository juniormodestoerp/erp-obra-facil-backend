import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { FetchCentersUseCase } from '@modules/centers/use-cases/fetch-centers-use-case'

export function makeFetchCentersUseCase() {
	const centersRepository = new PrismaCentersRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchCentersUseCase(centersRepository, usersRepository)
}
