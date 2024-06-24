import { PrismaTransfersRepository } from '@modules/transfers/repositories/prisma/repositories/transfers-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { SaveTransferUseCase } from '@modules/transfers/use-cases/save-transfer-use-case'

export function makeSaveTransferUseCase() {
	const transfersRepository = new PrismaTransfersRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveTransferUseCase(transfersRepository, usersRepository)
}
