import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { TotalsByContactUseCase } from '@modules/metrics/use-cases/totals-by-contact-use-case'

export function makeTotalsByContactUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new TotalsByContactUseCase(transactionsRepository)
}
