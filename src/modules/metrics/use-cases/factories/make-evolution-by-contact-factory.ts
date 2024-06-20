import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { EvolutionByContactUseCase } from '@modules/metrics/use-cases/evolution-by-contact-use-case'

export function makeEvolutionByContactUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new EvolutionByContactUseCase(transactionsRepository)
}
