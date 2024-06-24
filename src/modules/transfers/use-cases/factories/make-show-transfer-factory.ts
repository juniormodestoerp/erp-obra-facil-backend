import { PrismaTransfersRepository } from '@modules/transfers/repositories/prisma/repositories/transfers-respository'

import { ShowTransferUseCase } from '@modules/transfers/use-cases/show-transfer-use-case'

export function makeShowTransferUseCase() {
	const transfersRepository = new PrismaTransfersRepository()

	return new ShowTransferUseCase(transfersRepository)
}
