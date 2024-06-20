import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { AddTransactionUseCase } from '@modules/conciliations/use-cases/add-transaction-use-case'

export function makeAddTransactionUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new AddTransactionUseCase(transactionsRepository, usersRepository)
}
