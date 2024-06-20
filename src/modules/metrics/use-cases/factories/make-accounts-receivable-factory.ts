import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { AccountsReceivableUseCase } from '@modules/metrics/use-cases/accounts-receivable-use-case'

export function makeAccountsReceivableUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new AccountsReceivableUseCase(transactionsRepository)
}
