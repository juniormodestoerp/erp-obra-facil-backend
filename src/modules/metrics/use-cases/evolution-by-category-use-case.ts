import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ICategoryEvolution {
	categoryId: string | null
	evolution: { date: string; totalAmount: number }[]
}

interface Output {
	transactions: ICategoryEvolution[]
}

export class EvolutionByCategoryUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
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

		const evolutionByCategory = transactions.reduce(
			(acc, transaction) => {
				const categoryId = transaction.categoryId || 'uncategorized'
				const date = transaction.transactionDate.toISOString().slice(0, 7)

				if (!acc[categoryId]) {
					acc[categoryId] = {}
				}

				if (!acc[categoryId][date]) {
					acc[categoryId][date] = 0
				}

				acc[categoryId][date] += transaction.totalAmount
				return acc
			},
			{} as Record<string, Record<string, number>>,
		)

		const result: ICategoryEvolution[] = Object.keys(evolutionByCategory).map(
			(categoryId) => ({
				categoryId: categoryId === 'uncategorized' ? null : categoryId,
				evolution: Object.keys(evolutionByCategory[categoryId]).map((date) => ({
					date,
					totalAmount: evolutionByCategory[categoryId][date],
				})),
			}),
		)

		return {
			transactions: result,
		}
	}
}
