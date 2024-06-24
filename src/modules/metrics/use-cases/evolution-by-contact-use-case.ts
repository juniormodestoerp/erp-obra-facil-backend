import { addMonths, differenceInMonths } from 'date-fns'

import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEvolution {
	date: string
	totalAmount: number
	percentageChange: number
	accumulatedTotal: number
}

interface IContactEvolution {
	id: string
	contact: string | null
	evolution: IEvolution[]
}

interface Output {
	transactions: IContactEvolution[]
}

export class EvolutionByContactUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				contact: true,
				totalAmount: true,
				transactionDate: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const evolutionByContact = transactions.reduce(
			(acc, transaction) => {
				const contact = transaction.contact || 'unknown'
				const date = transaction.transactionDate.toISOString().slice(0, 7) // YYYY-MM format

				if (!acc[contact]) {
					acc[contact] = {
						createdAt: transaction.transactionDate,
						transactions: {},
					}
				}

				if (!acc[contact].transactions[date]) {
					acc[contact].transactions[date] = { totalAmount: 0, ids: [] }
				}

				acc[contact].transactions[date].totalAmount += transaction.totalAmount
				acc[contact].transactions[date].ids.push(transaction.id)
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

		const result: IContactEvolution[] = Object.keys(evolutionByContact).map(
			(contact) => {
				const { createdAt, transactions } = evolutionByContact[contact]
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
					contact: contact === 'unknown' ? null : contact,
					evolution,
				}
			},
		)

		return {
			transactions: result,
		}
	}
}
