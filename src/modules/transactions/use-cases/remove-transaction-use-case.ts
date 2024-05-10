import { AppError } from '@core/domain/errors/app-error'

import { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'

interface Input {
  id: string
  userId: string
}

export class RemoveTransactionUseCase {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async execute({ id, userId }: Input): Promise<void> {
    const transaction = await this.transactionsRepository.findById({
      id,
      userId,
    })
    if (!transaction) {
      throw new AppError({
        code: 'transaction.not_found',
      })
    }

    await this.transactionsRepository.remove(id)
  }
}
