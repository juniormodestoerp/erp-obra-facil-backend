import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-repository'

import { ShowCenterUseCase } from '@modules/centers/use-cases/show-center-use-case'

export function makeShowCenterUseCase() {
	const centersRepository = new PrismaCentersRepository()

	return new ShowCenterUseCase(centersRepository)
}
