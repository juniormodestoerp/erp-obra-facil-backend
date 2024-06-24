import { PrismaTransfersRepository } from '@modules/transfers/repositories/prisma/repositories/transfers-respository'

import { FetchSelectInputTransfersUseCase } from '@modules/transfers/use-cases/fetch-select-input-transfers-use-case'

export function makeFetchSelectInputTransfersUseCase() {
	const transfersRepository = new PrismaTransfersRepository()

	return new FetchSelectInputTransfersUseCase(transfersRepository)
}
