import { AppError } from '@core/domain/errors/app-error'

import { Transaction } from '@modules/transactions/entities/transaction'
import { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'

interface Input {
  id: string
  userId: string
}

interface Output {
  transaction: Transaction
}

export class ShowTransactionUseCase {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute({ id, userId }: Input): Promise<Output> {
    const transaction = await this.transactionsRepository.findById({
      id,
      userId,
    })

    if (!transaction) {
      throw new AppError({
        code: 'transaction.not_found',
      })
    }

    return {
      transaction,
    }
  }
}
