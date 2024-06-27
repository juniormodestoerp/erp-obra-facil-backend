import { PrismaCategoriesRepository } from '@modules/categories/repositories/prisma/repositories/prisma-categories-repository'
import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/prisma-transactions-repository'

import { CreateConciliationUseCase } from '@modules/conciliations/use-cases/create-conciliation-use-case'

export function makeCreateConciliationUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()
	const categoriesRepository = new PrismaCategoriesRepository()

	return new CreateConciliationUseCase(
		transactionsRepository,
		categoriesRepository,
	)
}
