import { PrismaCentersRepository } from '@modules/centers/repositories/prisma/repositories/prisma-centers-repository'

import { FetchSelectInputCentersUseCase } from '@modules/centers/use-cases/fetch-select-input-centers-use-case'

export function makeFetchSelectInputCentersUseCase() {
	const centersRepository = new PrismaCentersRepository()

	return new FetchSelectInputCentersUseCase(centersRepository)
}
