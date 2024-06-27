import { PrismaDomainTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/prisma-transactions-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { FetchTransactionsUseCase } from '@modules/transactions/use-cases/fetch-transactions-use-case'

export function makeFetchTransactionsUseCase() {
	const DomainTransactionsRepository = new PrismaDomainTransactionsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchTransactionsUseCase(
		DomainTransactionsRepository,
		usersRepository,
	)
}
