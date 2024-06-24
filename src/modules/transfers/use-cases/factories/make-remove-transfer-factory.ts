import { PrismaTransfersRepository } from '@modules/transfers/repositories/prisma/repositories/transfers-respository'

import { RemoveTransferUseCase } from '@modules/transfers/use-cases/remove-transfer-use-case'

export function makeRemoveTransferUseCase() {
	const transfersRepository = new PrismaTransfersRepository()

	return new RemoveTransferUseCase(transfersRepository)
}
