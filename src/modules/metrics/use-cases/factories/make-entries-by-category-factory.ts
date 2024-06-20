import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { EntriesByCategoryUseCase } from '@modules/metrics/use-cases/entries-by-category-use-case'

export function makeEntriesByCategoryUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new EntriesByCategoryUseCase(transactionsRepository)
}
