import { PrismaTransfersRepository } from '@modules/transfers/repositories/prisma/repositories/transfers-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { FetchTransfersUseCase } from '@modules/transfers/use-cases/fetch-transfers-use-case'

export function makeFetchTransfersUseCase() {
	const transfersRepository = new PrismaTransfersRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchTransfersUseCase(transfersRepository, usersRepository)
}
