import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ICashEntries {
	id: string
	totalAmount: number
	transactionDate: string
	description: string
}

interface Output {
	transactions: ICashEntries[]
}

export class CashEntriesUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
				accountType: 'Crédito',
			},
			select: {
				id: true,
				totalAmount: true,
				transactionDate: true,
				description: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const formattedTransactions: ICashEntries[] = transactions.map(
			(transaction) => ({
				...transaction,
				transactionDate: transaction.transactionDate.toISOString(),
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
