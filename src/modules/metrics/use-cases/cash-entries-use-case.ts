import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ICashEntries {
	id: string
	userId: string
	totalAmount: number
	transactionDate: Date
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
				userId: true,
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

		return {
			transactions,
		}
	}
}
