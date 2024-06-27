import { PrismaDomainTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/prisma-transactions-repository'

import { ShowTransactionUseCase } from '@modules/transactions/use-cases/show-transaction-use-case'

export function makeShowTransactionUseCase() {
	const DomainTransactionsRepository = new PrismaDomainTransactionsRepository()

	return new ShowTransactionUseCase(DomainTransactionsRepository)
}
