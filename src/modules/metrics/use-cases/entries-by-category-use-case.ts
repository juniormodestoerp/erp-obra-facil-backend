import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface Output {
	transactions: {
		categoryId: string | null
		totalAmount: number
	}[]
}

export class EntriesByCategoryUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				categoryId: true,
				totalAmount: true,
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
