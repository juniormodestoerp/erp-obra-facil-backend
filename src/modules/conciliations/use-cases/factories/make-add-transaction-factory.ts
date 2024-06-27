import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/prisma-categories-repository'
import { PrismaDomainTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/prisma-transactions-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { AddTransactionUseCase } from '@modules/conciliations/use-cases/add-transaction-use-case'

export function makeAddTransactionUseCase() {
	const domainTransactionsRepository = new PrismaDomainTransactionsRepository()
	const usersRepository = new PrismaUsersRepository()
	const categoriesRepository = new PrismaCategoriesRepository()

	return new AddTransactionUseCase(
		domainTransactionsRepository,
		usersRepository,
		categoriesRepository,
	)
}
