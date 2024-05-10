import { AppError } from '@core/domain/errors/app-error'

import { Transaction } from '@modules/transactions/entities/transaction'
import { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'
import { UsersRepository } from '@modules/users/repositories/user-repository'

type Input = {
  pageIndex: number
  userId: string
}

type Output = {
  transactions: Transaction[]
  totalCount: number
}

export class FetchTransactionsUseCase {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ pageIndex, userId }: Input): Promise<Output> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    const transactions = await this.transactionsRepository.findMany({
      pageIndex,
      userId,
    })
    if (transactions.length === 0) {
      throw new AppError({
        code: 'transaction.not_found',
      })
    }

    const totalCount = await this.transactionsRepository.count()

    return {
      transactions,
      totalCount,
    }
  }
}
