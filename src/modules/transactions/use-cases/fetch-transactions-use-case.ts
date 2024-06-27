import { AppError } from '@core/domain/errors/app-error'

import type { Transaction } from '@modules/transactions/entities/transaction'
import type { DomainTransactionsRepository } from '@modules/transactions/repositories/domain-transactions-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

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
		private readonly DomainTransactionsRepository: DomainTransactionsRepository,
		private readonly usersRepository: DomainUsersRepository,
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

		const transactions = await this.DomainTransactionsRepository.findMany({
			pageIndex,
			userId,
			searchTerm,
		})

		if (transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		console.log(JSON.stringify(transactions, null, 2))

		const totalCount = await this.DomainTransactionsRepository.count(searchTerm)

		return {
			transactions,
			totalCount,
		}
	}
}
