import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ICategoryTotal {
	categoryId: string | null
	totalAmount: number
}

interface Output {
	transactions: ICategoryTotal[]
}

export class TotalsByCategoryUseCase {
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

		const totalsByCategory = transactions.reduce(
			(acc, transaction) => {
				const categoryId = transaction.categoryId || 'uncategorized'
				if (!acc[categoryId]) {
					acc[categoryId] = 0
				}
				acc[categoryId] += transaction.totalAmount
				return acc
			},
			{} as Record<string, number>,
		)

		const result: ICategoryTotal[] = Object.keys(totalsByCategory).map(
			(categoryId) => ({
				categoryId: categoryId === 'uncategorized' ? null : categoryId,
				totalAmount: totalsByCategory[categoryId],
			}),
		)

		return {
			transactions: result,
		}
	}
}
