import { PrismaCostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/prisma/repositories/cost-and-profit-centers-respository'

import { ShowCostAndProfitCenterUseCase } from '@modules/cost-and-profit-centers/use-cases/show-cost-and-profit-center-use-case'

export function makeShowCostAndProfitCenterUseCase() {
	const costAndProfitCentersRepository =
		new PrismaCostAndProfitCentersRepository()

	return new ShowCostAndProfitCenterUseCase(costAndProfitCentersRepository)
}
