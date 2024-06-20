import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { CashEntriesUseCase } from '@modules/metrics/use-cases/cash-entries-use-case'

export function makeCashEntriesUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new CashEntriesUseCase(transactionsRepository)
}
