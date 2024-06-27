import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ICashFlow {
	id: string
	amount: number
	date: string
	description: string
}

interface IDailyBalance {
	date: string
	previousDayBalance: number
	totalEntries: number
	totalExits: number
	total: number
	endOfDayBalance: number
	transactions: ICashFlow[]
}

interface Output {
	transactions: IDailyBalance[]
}

export class CashFlowUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				amount: true,
				date: true,
				description: true,
			},
			orderBy: {
				date: 'asc',
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const groupedTransactions = transactions.reduce(
			(acc, transaction) => {
				const date = transaction.date.toISOString().split('T')[0]
				if (!acc[date]) {
					acc[date] = []
				}
				acc[date].push({
					...transaction,
					date: transaction.date.toISOString(),
				})
				return acc
			},
			{} as Record<string, ICashFlow[]>,
		)

		let previousDayBalance = 0
		const dailyBalances: IDailyBalance[] = Object.keys(groupedTransactions).map(
			(date) => {
				const dayTransactions = groupedTransactions[date]
				const totalEntries = dayTransactions
					.filter((t) => t.amount > 0)
					.reduce((sum, t) => sum + t.amount, 0)
				const totalExits = dayTransactions
					.filter((t) => t.amount < 0)
					.reduce((sum, t) => sum + t.amount, 0)
				const total = totalEntries + totalExits
				const endOfDayBalance = previousDayBalance + total

				const dayBalance: IDailyBalance = {
					date,
					previousDayBalance,
					totalEntries,
					totalExits,
					total,
					endOfDayBalance,
					transactions: dayTransactions,
				}

				previousDayBalance = endOfDayBalance
				return dayBalance
			},
		)

		return {
			transactions: dailyBalances,
		}
	}
}
