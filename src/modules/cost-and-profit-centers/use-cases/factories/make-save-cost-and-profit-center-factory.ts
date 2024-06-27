import { PrismaCostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/prisma/repositories/cost-and-profit-centers-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { SaveCostAndProfitCenterUseCase } from '@modules/cost-and-profit-centers/use-cases/save-cost-and-profit-center-use-case'

export function makeSaveCostAndProfitCenterUseCase() {
	const costAndProfitCentersRepository =
		new PrismaCostAndProfitCentersRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveCostAndProfitCenterUseCase(
		costAndProfitCentersRepository,
		usersRepository,
	)
}
