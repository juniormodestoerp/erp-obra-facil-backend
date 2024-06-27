import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/prisma-transactions-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { SaveTransactionUseCase } from '@modules/transactions/use-cases/save-transaction-use-case'

export function makeSaveTransactionUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveTransactionUseCase(
		transactionsRepository,
		usersRepository,
	)
}
