import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { EntriesByCenterUseCase } from '@modules/metrics/use-cases/entries-by-center-use-case'

export function makeEntriesByCenterUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new EntriesByCenterUseCase(transactionsRepository)
}
