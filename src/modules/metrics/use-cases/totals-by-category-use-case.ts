import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface TotalsByCategory {
	id: string
	categoryId: string | null
	amount: number
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
				category: {
					select: {
						name: true,
					},
				},
				amount: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const totalsByCategory = transactions.reduce(
			(acc, transaction) => {
				const categoryId = transaction.category?.name || 'uncategorized'
				if (!acc[categoryId]) {
					acc[categoryId] = { amount: 0, ids: [] }
				}
				acc[categoryId].amount += transaction.amount
				acc[categoryId].ids.push(transaction.id)
				return acc
			},
			{} as Record<string, { amount: number; ids: string[] }>,
		)

		const result: TotalsByCategory[] = Object.keys(totalsByCategory).map(
			(categoryId) => ({
				id: totalsByCategory[categoryId].ids.join(', '),
				categoryId: categoryId === 'uncategorized' ? null : categoryId,
				amount: totalsByCategory[categoryId].amount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
