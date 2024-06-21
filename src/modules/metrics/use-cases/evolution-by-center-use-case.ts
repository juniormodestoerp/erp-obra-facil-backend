import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEvolution {
	date: string
	totalAmount: number
}

interface ICenterEvolution {
	id: string
	centerId: string | null
	evolution: IEvolution[]
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
				id: true,
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
					acc[centerId] = { totalAmounts: {}, ids: [] }
				}

				if (!acc[centerId].totalAmounts[date]) {
					acc[centerId].totalAmounts[date] = 0
				}

				acc[centerId].totalAmounts[date] += transaction.totalAmount
				acc[centerId].ids.push(transaction.id)
				return acc
			},
			{} as Record<
				string,
				{ totalAmounts: Record<string, number>; ids: string[] }
			>,
		)

		const result: ICenterEvolution[] = Object.keys(evolutionByCenter).map(
			(centerId) => ({
				id: evolutionByCenter[centerId].ids.join(', '),
				centerId: centerId === 'uncategorized' ? null : centerId,
				evolution: Object.keys(evolutionByCenter[centerId].totalAmounts).map(
					(date) => ({
						date,
						totalAmount: evolutionByCenter[centerId].totalAmounts[date],
					}),
				),
			}),
		)

		return {
			transactions: result,
		}
	}
}
