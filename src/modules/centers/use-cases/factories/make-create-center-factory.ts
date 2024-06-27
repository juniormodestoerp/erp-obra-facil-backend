import { PrismaCostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/prisma/repositories/cost-and-profit-centers-respository'

import { CreateCostAndProfitCenterUseCase } from '@modules/cost-and-profit-centers/use-cases/create-cost-and-profit-center-use-case'

export function makeCreateCostAndProfitCenterUseCase() {
	const costAndProfitCentersRepository =
		new PrismaCostAndProfitCentersRepository()

	return new CreateCostAndProfitCenterUseCase(costAndProfitCentersRepository)
}
