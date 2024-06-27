import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/categories-repository'
import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-repository'

import { AddTransactionUseCase } from '@modules/conciliations/use-cases/add-transaction-use-case'

export function makeAddTransactionUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()
	const usersRepository = new PrismaUsersRepository()
	const categoriesRepository = new PrismaCategoriesRepository()

	return new AddTransactionUseCase(
		transactionsRepository,
		usersRepository,
		categoriesRepository,
	)
}
