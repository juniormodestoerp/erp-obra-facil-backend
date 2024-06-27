import { PrismaDomainTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/prisma-transactions-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { CreateTransactionUseCase } from '@modules/transactions/use-cases/create-transaction-use-case'

export function makeCreateTransactionUseCase() {
	const DomainTransactionsRepository = new PrismaDomainTransactionsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new CreateTransactionUseCase(
		DomainTransactionsRepository,
		usersRepository,
	)
}
