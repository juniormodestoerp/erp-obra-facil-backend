import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { TotalsByProjectUseCase } from '@modules/metrics/use-cases/totals-by-project-use-case'

export function makeTotalsByProjectUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new TotalsByProjectUseCase(transactionsRepository)
}
