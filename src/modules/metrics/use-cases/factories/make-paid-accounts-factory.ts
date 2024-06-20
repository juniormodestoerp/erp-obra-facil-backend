import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { PaidAccountsUseCase } from '@modules/metrics/use-cases/paid-accounts-use-case'

export function makePaidAccountsUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new PaidAccountsUseCase(transactionsRepository)
}
