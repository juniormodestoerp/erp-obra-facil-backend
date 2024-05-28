import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { FetchTransactionsUseCase } from '@modules/transactions/use-cases/fetch-transactions-use-case'

export function makeFetchTransactionsUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchTransactionsUseCase(transactionsRepository, usersRepository)
}
