import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ICenterTotal {
	centerId: string | null
	totalAmount: number
}

interface Output {
	transactions: ICenterTotal[]
}

export class TotalsByCenterUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
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
					acc[centerId] = 0
				}
				acc[centerId] += transaction.totalAmount
				return acc
			},
			{} as Record<string, number>,
		)

		const result: ICenterTotal[] = Object.keys(totalsByCenter).map(
			(centerId) => ({
				centerId: centerId === 'uncategorized' ? null : centerId,
				totalAmount: totalsByCenter[centerId],
			}),
		)

		return {
			transactions: result,
		}
	}
}
