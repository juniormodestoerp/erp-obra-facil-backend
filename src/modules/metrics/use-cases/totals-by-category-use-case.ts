import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface TotalsByCategory {
	id: string
	categoryId: string | null
	totalAmount: number
}

interface Output {
	transactions: TotalsByCategory[]
}

export class TotalsByCategoryUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
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
					acc[categoryId] = { totalAmount: 0, ids: [] }
				}
				acc[categoryId].totalAmount += transaction.totalAmount
				acc[categoryId].ids.push(transaction.id)
				return acc
			},
			{} as Record<string, { totalAmount: number, ids: string[] }>,
		)

		const result: TotalsByCategory[] = Object.keys(totalsByCategory).map(
			(categoryId) => ({
				id: totalsByCategory[categoryId].ids.join(', '),
				categoryId: categoryId === 'uncategorized' ? null : categoryId,
				totalAmount: totalsByCategory[categoryId].totalAmount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
