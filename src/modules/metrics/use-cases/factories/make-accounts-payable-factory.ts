import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { AccountsPayableUseCase } from '@modules/metrics/use-cases/accounts-payable-use-case'

export function makeAccountsPayableUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new AccountsPayableUseCase(transactionsRepository)
}
