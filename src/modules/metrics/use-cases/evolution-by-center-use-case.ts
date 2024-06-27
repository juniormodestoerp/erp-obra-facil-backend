import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'
import { addMonths, differenceInMonths } from 'date-fns'

interface Input {
	userId: string
}

interface IEvolution {
	date: string
	amount: number
	percentageChange: number
	accumulatedTotal: number
}

interface ICenterEvolution {
	id: string
	centerId: string[] | null
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
				center: {
					select: {
						id: true,
						name: true,
					},
				},
				amount: true,
				date: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const evolutionByCenter = transactions.reduce(
			(acc, transaction) => {
				const centerName = transaction.center?.name || 'Não informado'
				const date = transaction.date.toISOString().slice(0, 7)

				if (!acc[centerName]) {
					acc[centerName] = {
						createdAt: transaction.date,
						transactions: {},
					}
				}

				if (!acc[centerName].transactions[date]) {
					acc[centerName].transactions[date] = { amount: 0, ids: [] }
				}

				acc[centerName].transactions[date].amount += transaction.amount
				acc[centerName].transactions[date].ids.push(transaction.id)
				return acc
			},
			{} as Record<
				string,
				{
					createdAt: Date
					transactions: Record<string, { amount: number; ids: string[] }>
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

					const amount = transactions[currentMonth]?.amount || 0
					accumulatedTotal += amount

					const previousMonth = addMonths(currentDate, -1)
						.toISOString()
						.slice(0, 7)
					const previousAmount = transactions[previousMonth]?.amount || 0
					const percentageChange = previousAmount
						? ((amount - previousAmount) / Math.abs(previousAmount)) * 100
						: 0

					evolution.push({
						date: currentMonth,
						amount,
						percentageChange,
						accumulatedTotal,
					})
				}

				const ids = Object.values(transactions)
					.flatMap((item) => item.ids)
					.join(', ')

				const center = transactions[centerName]
				return {
					id: ids,
					centerId: centerName === 'Não informado' ? null : center.ids,
					centerName: centerName === 'Não informado' ? null : centerName,
					evolution,
				}
			},
		)

		return {
			transactions: result,
		}
	}
}
