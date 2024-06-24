import { PrismaCostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/prisma/repositories/cost-and-profit-centers-respository'

import { FetchSelectInputCostAndProfitCentersUseCase } from '@modules/cost-and-profit-centers/use-cases/fetch-select-input-cost-and-profit-centers-use-case'

export function makeFetchSelectInputCostAndProfitCentersUseCase() {
	const costAndProfitCentersRepository = new PrismaCostAndProfitCentersRepository()

	return new FetchSelectInputCostAndProfitCentersUseCase(costAndProfitCentersRepository)
}
