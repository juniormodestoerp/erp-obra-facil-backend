import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-respository'

import { CreateCenterUseCase } from '@modules/centers/use-cases/create-center-use-case'

export function makeCreateCenterUseCase() {
	const centersRepository = new PrismaCentersRepository()

	return new CreateCenterUseCase(centersRepository)
}
