import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'
import { addMonths, differenceInMonths } from 'date-fns'

interface Input {
	userId: string
}

interface IEvolution {
	date: string
	totalAmount: number
	percentageChange: number
	accumulatedTotal: number
}

interface ICenterEvolution {
	id: string
	centerId: string | null
	centerName: string | null
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
				const centerName = transaction.costAndProfitCenters || 'Uncategorized'
				const date = transaction.transactionDate.toISOString().slice(0, 7)

				if (!acc[centerName]) {
					acc[centerName] = {
						createdAt: transaction.transactionDate,
						transactions: {},
					}
				}

				if (!acc[centerName].transactions[date]) {
					acc[centerName].transactions[date] = { totalAmount: 0, ids: [] }
				}

				acc[centerName].transactions[date].totalAmount +=
					transaction.totalAmount
				acc[centerName].transactions[date].ids.push(transaction.id)
				return acc
			},
			{} as Record<
				string,
				{
					createdAt: Date
					transactions: Record<string, { totalAmount: number; ids: string[] }>
				}
			>,
		)

		const result: ICenterEvolution[] = Object.keys(evolutionByCenter).map(
			(centerName) => {
				const { createdAt, transactions } = evolutionByCenter[centerName]
				const evolution: IEvolution[] = []

				const startDate = new Date(createdAt)
				const endDate = new Date()

				const totalMonths = differenceInMonths(endDate, startDate) + 1

				let accumulatedTotal = 0

				for (let i = 0; i < totalMonths; i++) {
					const currentDate = addMonths(startDate, i)
					const currentMonth = currentDate.toISOString().slice(0, 7)

					const totalAmount = transactions[currentMonth]?.totalAmount || 0
					accumulatedTotal += totalAmount

					const previousMonth = addMonths(currentDate, -1)
						.toISOString()
						.slice(0, 7)
					const previousAmount = transactions[previousMonth]?.totalAmount || 0
					const percentageChange = previousAmount
						? ((totalAmount - previousAmount) / Math.abs(previousAmount)) * 100
						: 0

					evolution.push({
						date: currentMonth,
						totalAmount,
						percentageChange,
						accumulatedTotal,
					})
				}

				const ids = Object.values(transactions)
					.flatMap((item) => item.ids)
					.join(', ')

				return {
					id: ids,
					centerId: centerName === 'Uncategorized' ? null : centerName,
					centerName: centerName === 'Uncategorized' ? null : centerName,
					evolution,
				}
			},
		)

		return {
			transactions: result,
		}
	}
}
