import { addMonths, differenceInMonths } from 'date-fns'

import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEvolution {
	date: string
	amount: number
	percentageChange: number
	accumulatedTotal: number
}

interface ICategoryEvolution {
	id: string
	categoryId: string | null
	categoryName: string | null
	evolution: IEvolution[]
}

interface Output {
	transactions: ICategoryEvolution[]
}

export class EvolutionByCategoryUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				categoryId: true,
				amount: true,
				date: true,
				category: {
					select: {
						id: true,
						name: true,
						createdAt: true,
					},
				},
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const evolutionByCategory = transactions.reduce(
			(acc, transaction) => {
				const categoryId = transaction.categoryId || 'uncategorized'
				const date = transaction.date.toISOString().slice(0, 7)

				if (!acc[categoryId]) {
					acc[categoryId] = {
						categoryName: transaction.category?.name || 'Uncategorized',
						createdAt: transaction.category?.createdAt || new Date(),
						transactions: {},
					}
				}

				if (!acc[categoryId].transactions[date]) {
					acc[categoryId].transactions[date] = { amount: 0, ids: [] }
				}

				acc[categoryId].transactions[date].amount += transaction.amount
				acc[categoryId].transactions[date].ids.push(transaction.id)
				return acc
			},
			{} as Record<
				string,
				{
					categoryName: string
					createdAt: Date
					transactions: Record<string, { amount: number; ids: string[] }>
				}
			>,
		)

		const result: ICategoryEvolution[] = Object.keys(evolutionByCategory).map(
			(categoryId) => {
				const { categoryName, createdAt, transactions } =
					evolutionByCategory[categoryId]
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
						? ((amount - previousAmount) / previousAmount) * 100
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

				return {
					id: ids,
					categoryId: categoryId === 'uncategorized' ? null : categoryId,
					categoryName: categoryName === 'Uncategorized' ? null : categoryName,
					evolution,
				}
			},
		)

		return {
			transactions: result,
		}
	}
}
