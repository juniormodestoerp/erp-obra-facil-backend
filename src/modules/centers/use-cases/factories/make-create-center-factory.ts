import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-respository'

import { CreateCostAndProfitCenterUseCase } from '@modules/centers/use-cases/create-center-use-case'

export function makeCreateCostAndProfitCenterUseCase() {
	const centersRepository = new PrismaCentersRepository()

	return new CreateCostAndProfitCenterUseCase(centersRepository)
}
