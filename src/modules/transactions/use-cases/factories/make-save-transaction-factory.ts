import { PrismaDomainTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/prisma-transactions-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { SaveTransactionUseCase } from '@modules/transactions/use-cases/save-transaction-use-case'

export function makeSaveTransactionUseCase() {
	const DomainTransactionsRepository = new PrismaDomainTransactionsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveTransactionUseCase(
		DomainTransactionsRepository,
		usersRepository,
	)
}
