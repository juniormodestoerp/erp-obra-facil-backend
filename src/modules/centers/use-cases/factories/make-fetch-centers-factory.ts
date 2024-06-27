import { PrismaCostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/prisma/repositories/cost-and-profit-centers-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { FetchCostAndProfitCentersUseCase } from '@modules/cost-and-profit-centers/use-cases/fetch-cost-and-profit-centers-use-case'

export function makeFetchCostAndProfitCentersUseCase() {
	const costAndProfitCentersRepository =
		new PrismaCostAndProfitCentersRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchCostAndProfitCentersUseCase(
		costAndProfitCentersRepository,
		usersRepository,
	)
}
