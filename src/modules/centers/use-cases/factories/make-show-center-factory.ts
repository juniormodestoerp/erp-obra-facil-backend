import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-respository'

import { ShowCostAndProfitCenterUseCase } from '@modules/centers/use-cases/show-center-use-case'

export function makeShowCostAndProfitCenterUseCase() {
	const centersRepository = new PrismaCentersRepository()

	return new ShowCostAndProfitCenterUseCase(centersRepository)
}
