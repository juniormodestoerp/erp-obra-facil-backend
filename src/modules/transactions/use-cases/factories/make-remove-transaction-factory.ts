import { PrismaDomainTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/prisma-transactions-repository'

import { RemoveTransactionUseCase } from '@modules/transactions/use-cases/remove-transaction-use-case'

export function makeRemoveTransactionUseCase() {
	const DomainTransactionsRepository = new PrismaDomainTransactionsRepository()

	return new RemoveTransactionUseCase(DomainTransactionsRepository)
}
