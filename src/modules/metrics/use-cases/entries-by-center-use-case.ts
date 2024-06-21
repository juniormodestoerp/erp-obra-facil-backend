import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ICenterTotal {
	id: string
	costAndProfitCenters: string | null
	totalAmount: number
}

interface Output {
	transactions: ICenterTotal[]
}

export class EntriesByCenterUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				costAndProfitCenters: true,
				totalAmount: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
				message: 'No transactions found for the given user.',
			})
		}

		const totalsByCenter = transactions.reduce(
			(acc, transaction) => {
				const centerId = transaction.costAndProfitCenters || 'uncategorized'
				if (!acc[centerId]) {
					acc[centerId] = { totalAmount: 0, ids: [] }
				}
				acc[centerId].totalAmount += transaction.totalAmount
				acc[centerId].ids.push(transaction.id)
				return acc
			},
			{} as Record<string, { totalAmount: number, ids: string[] }>,
		)

		const result: ICenterTotal[] = Object.keys(totalsByCenter).map(
			(costAndProfitCenters) => ({
				id: totalsByCenter[costAndProfitCenters].ids.join(', '),
				costAndProfitCenters:
					costAndProfitCenters === 'uncategorized'
						? null
						: costAndProfitCenters,
				totalAmount: totalsByCenter[costAndProfitCenters].totalAmount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
