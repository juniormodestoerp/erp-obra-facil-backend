import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { EntriesByProjectUseCase } from '@modules/metrics/use-cases/entries-by-project-use-case'

export function makeEntriesByProjectUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new EntriesByProjectUseCase(transactionsRepository)
}
