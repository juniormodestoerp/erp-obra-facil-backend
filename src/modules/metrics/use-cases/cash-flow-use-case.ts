import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ICashFlow {
	id: string
	totalAmount: number
	transactionDate: string
	description: string
}

interface Output {
	transactions: ICashFlow[]
}

export class CashFlowUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
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

		const formattedTransactions: ICashFlow[] = transactions.map(transaction => ({
			...transaction,
			transactionDate: transaction.transactionDate.toISOString(),
		}));

		return {
			transactions: formattedTransactions,
		}
	}
}
