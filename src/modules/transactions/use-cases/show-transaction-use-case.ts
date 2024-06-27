import { AppError } from '@core/domain/errors/app-error'

import type { Transaction } from '@modules/transactions/entities/transaction'
import type { DomainTransactionsRepository } from '@modules/transactions/repositories/domain-transactions-repository'

interface Input {
	id: string
	userId: string
}

interface Output {
	transaction: Transaction
}

export class ShowTransactionUseCase {
	constructor(
		private readonly DomainTransactionsRepository: DomainTransactionsRepository,
	) {}

	async execute({ id, userId }: Input): Promise<Output> {
		const transaction = await this.DomainTransactionsRepository.findById({
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
