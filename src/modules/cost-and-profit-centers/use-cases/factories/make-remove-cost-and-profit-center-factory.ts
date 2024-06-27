import { PrismaCostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/prisma/repositories/cost-and-profit-centers-respository'

import { RemoveCostAndProfitCenterUseCase } from '@modules/cost-and-profit-centers/use-cases/remove-cost-and-profit-center-use-case'

export function makeRemoveCostAndProfitCenterUseCase() {
	const costAndProfitCentersRepository =
		new PrismaCostAndProfitCentersRepository()

	return new RemoveCostAndProfitCenterUseCase(costAndProfitCentersRepository)
}
