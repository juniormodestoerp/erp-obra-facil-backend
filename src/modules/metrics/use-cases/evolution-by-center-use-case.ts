import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ICenterEvolution {
	centerId: string | null
	evolution: { date: string; totalAmount: number }[]
}

interface Output {
	transactions: ICenterEvolution[]
}

export class EvolutionByCenterUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				costAndProfitCenters: true,
				totalAmount: true,
				transactionDate: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const evolutionByCenter = transactions.reduce(
			(acc, transaction) => {
				const centerId = transaction.costAndProfitCenters || 'uncategorized'
				const date = transaction.transactionDate.toISOString().slice(0, 7)

				if (!acc[centerId]) {
					acc[centerId] = {}
				}

				if (!acc[centerId][date]) {
					acc[centerId][date] = 0
				}

				acc[centerId][date] += transaction.totalAmount
				return acc
			},
			{} as Record<string, Record<string, number>>,
		)

		const result: ICenterEvolution[] = Object.keys(evolutionByCenter).map(
			(centerId) => ({
				centerId: centerId === 'uncategorized' ? null : centerId,
				evolution: Object.keys(evolutionByCenter[centerId]).map((date) => ({
					date,
					totalAmount: evolutionByCenter[centerId][date],
				})),
			}),
		)

		return {
			transactions: result,
		}
	}
}
