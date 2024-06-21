import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ITotalsByCenter {
	id: string
	centerId: string | null
	totalAmount: number
}

interface Output {
	transactions: ITotalsByCenter[]
}

export class TotalsByCenterUseCase {
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

		const result: ITotalsByCenter[] = Object.keys(totalsByCenter).map(
			(centerId) => ({
				id: totalsByCenter[centerId].ids.join(', '),
				centerId: centerId === 'uncategorized' ? null : centerId,
				totalAmount: totalsByCenter[centerId].totalAmount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
