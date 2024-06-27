import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { SaveCostAndProfitCenterUseCase } from '@modules/centers/use-cases/save-center-use-case'

export function makeSaveCostAndProfitCenterUseCase() {
	const centersRepository = new PrismaCentersRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveCostAndProfitCenterUseCase(centersRepository, usersRepository)
}
