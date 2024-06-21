import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEvolution {
	date: string
	totalAmount: number
}

interface ICategoryEvolution {
	id: string
	categoryId: string | null
	evolution: IEvolution[]
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
				id: true,
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
					acc[categoryId][date] = { totalAmount: 0, ids: [] }
				}

				acc[categoryId][date].totalAmount += transaction.totalAmount
				acc[categoryId][date].ids.push(transaction.id)
				return acc
			},
			{} as Record<
				string,
				Record<string, { totalAmount: number; ids: string[] }>
			>,
		)

		const result: ICategoryEvolution[] = Object.keys(evolutionByCategory).map(
			(categoryId) => {
				const evolution = Object.keys(evolutionByCategory[categoryId]).map(
					(date) => ({
						date,
						totalAmount: evolutionByCategory[categoryId][date].totalAmount,
					}),
				)

				const ids = Object.values(evolutionByCategory[categoryId])
					.flatMap((item) => item.ids)
					.join(', ')

				return {
					id: ids,
					categoryId: categoryId === 'uncategorized' ? null : categoryId,
					evolution,
				}
			},
		)

		return {
			transactions: result,
		}
	}
}
