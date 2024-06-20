import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { ReceivedAccountsUseCase } from '@modules/metrics/use-cases/received-accounts-use-case'

export function makeReceivedAccountsUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new ReceivedAccountsUseCase(transactionsRepository)
}
