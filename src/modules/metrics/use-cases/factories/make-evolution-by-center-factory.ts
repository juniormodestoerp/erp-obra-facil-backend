import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { EvolutionByCenterUseCase } from '@modules/metrics/use-cases/evolution-by-center-use-case'

export function makeEvolutionByCenterUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new EvolutionByCenterUseCase(transactionsRepository)
}
