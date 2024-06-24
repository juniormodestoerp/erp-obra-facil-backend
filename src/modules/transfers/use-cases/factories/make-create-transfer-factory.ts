import { PrismaTransfersRepository } from '@modules/transfers/repositories/prisma/repositories/transfers-respository'

import { CreateTransferUseCase } from '@modules/transfers/use-cases/create-transfer-use-case'

export function makeCreateTransferUseCase() {
	const transfersRepository = new PrismaTransfersRepository()

	return new CreateTransferUseCase(transfersRepository)
}
