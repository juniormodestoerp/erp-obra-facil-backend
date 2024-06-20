import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { EntriesByContactUseCase } from '@modules/metrics/use-cases/entries-by-contact-use-case'

export function makeEntriesByContactUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new EntriesByContactUseCase(transactionsRepository)
}
