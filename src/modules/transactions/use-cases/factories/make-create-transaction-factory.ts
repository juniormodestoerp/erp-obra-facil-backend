import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { CreateTransactionUseCase } from '@modules/transactions/use-cases/create-transaction-use-case'

export function makeCreateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const usersRepository = new PrismaUsersRepository()

  return new CreateTransactionUseCase(transactionsRepository, usersRepository)
}
