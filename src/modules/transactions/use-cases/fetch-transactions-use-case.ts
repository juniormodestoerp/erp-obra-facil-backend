import { AppError } from '@core/domain/errors/app-error'

import type { Transaction } from '@modules/transactions/entities/transaction'
import type { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	pageIndex: number
	userId: string
	searchTerm?: string
}

interface Output {
	transactions: Transaction[]
	totalCount: number
}

export class FetchTransactionsUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({ pageIndex, userId, searchTerm }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})
		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const transactions = await this.transactionsRepository.findMany({
			pageIndex,
			userId,
			searchTerm,
		})

		if (transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const totalCount = await this.transactionsRepository.count(searchTerm)

		return {
			transactions,
			totalCount,
		}
	}
}
