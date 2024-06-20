import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { EvolutionByCategoryUseCase } from '@modules/metrics/use-cases/evolution-by-category-use-case'

export function makeEvolutionByCategoryUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new EvolutionByCategoryUseCase(transactionsRepository)
}
