import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-repository'

import { RemoveCenterUseCase } from '@modules/centers/use-cases/remove-center-use-case'

export function makeRemoveCenterUseCase() {
	const centersRepository = new PrismaCentersRepository()

	return new RemoveCenterUseCase(centersRepository)
}
