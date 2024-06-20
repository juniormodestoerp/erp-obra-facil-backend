import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { TotalsByCenterUseCase } from '@modules/metrics/use-cases/totals-by-center-use-case'

export function makeTotalsByCenterUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new TotalsByCenterUseCase(transactionsRepository)
}
