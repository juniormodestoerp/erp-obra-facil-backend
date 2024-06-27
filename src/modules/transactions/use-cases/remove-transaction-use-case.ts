import { AppError } from '@core/domain/errors/app-error'

import type { DomainTransactionsRepository } from '@modules/transactions/repositories/domain-transactions-repository'

interface Input {
	id: string
	userId: string
}

export class RemoveTransactionUseCase {
	constructor(
		private readonly DomainTransactionsRepository: DomainTransactionsRepository,
	) {}

	async execute({ id, userId }: Input): Promise<void> {
		const transaction = await this.DomainTransactionsRepository.findById({
			id,
			userId,
		})
		if (!transaction) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		await this.DomainTransactionsRepository.remove(id)
	}
}
