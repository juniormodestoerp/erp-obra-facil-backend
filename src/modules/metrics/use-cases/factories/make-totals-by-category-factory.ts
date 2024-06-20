import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { TotalsByCategoryUseCase } from '@modules/metrics/use-cases/totals-by-category-use-case'

export function makeTotalsByCategoryUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new TotalsByCategoryUseCase(transactionsRepository)
}
