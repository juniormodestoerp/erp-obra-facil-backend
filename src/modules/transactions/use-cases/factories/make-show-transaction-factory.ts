import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-repository'

import { ShowTransactionUseCase } from '@modules/transactions/use-cases/show-transaction-use-case'

export function makeShowTransactionUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new ShowTransactionUseCase(transactionsRepository)
}
