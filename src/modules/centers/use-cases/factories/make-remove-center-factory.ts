import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-respository'

import { RemoveCostAndProfitCenterUseCase } from '@modules/centers/use-cases/remove-center-use-case'

export function makeRemoveCostAndProfitCenterUseCase() {
	const centersRepository = new PrismaCentersRepository()

	return new RemoveCostAndProfitCenterUseCase(centersRepository)
}
