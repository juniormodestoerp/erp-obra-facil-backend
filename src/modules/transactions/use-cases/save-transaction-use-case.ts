import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Transaction } from '@modules/transactions/entities/transaction'
import type { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id?: string
	userId: string
	transactionId?: string
	name: string
	description?: string
}

export class SaveTransactionUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({
		id,
		userId,
		transactionId,
		name,
		description,
	}: Input): Promise<void> {
		const user = await this.usersRepository.findById(userId)
		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const transaction = Transaction.create(
			{
				userId,
				transactionId,
				name,
				description,
			},
			new UniqueEntityID(id),
		)

		await this.transactionsRepository.save(transaction)
	}
}
