import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface Output {
	transactions: {
		id: string
		userId: string
		categoryId: string | null
		totalAmount: number
		transactionDate: Date
	}[]
}

export class AccountsPayableUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				userId: true,
				categoryId: true,
				totalAmount: true,
				transactionDate: true,
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
