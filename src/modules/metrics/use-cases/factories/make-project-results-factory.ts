import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { ProjectResultsUseCase } from '@modules/metrics/use-cases/project-results-use-case'

export function makeProjectResultsUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new ProjectResultsUseCase(transactionsRepository)
}
