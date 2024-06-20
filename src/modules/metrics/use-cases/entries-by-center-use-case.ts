import { AppError } from '@core/domain/errors/app-error'

import type { Transaction } from '@modules/transactions/entities/transaction'
import type { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'

interface Input {
	userId: string
}

interface Output {
	transaction: Transaction
}

export class EntriesByCenterUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
	) {}

	async execute({ userId }: Input): Promise<Output> {
		const transaction = await this.transactionsRepository.findById({
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
