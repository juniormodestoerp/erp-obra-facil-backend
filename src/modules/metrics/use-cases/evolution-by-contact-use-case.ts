import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IContactEvolution {
	contact: string | null
	evolution: { date: string; totalAmount: number }[]
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
					acc[contact] = {}
				}

				if (!acc[contact][date]) {
					acc[contact][date] = 0
				}

				acc[contact][date] += transaction.totalAmount
				return acc
			},
			{} as Record<string, Record<string, number>>,
		)

		const result: IContactEvolution[] = Object.keys(evolutionByContact).map(
			(contact) => ({
				contact: contact === 'unknown' ? null : contact,
				evolution: Object.keys(evolutionByContact[contact]).map((date) => ({
					date,
					totalAmount: evolutionByContact[contact][date],
				})),
			}),
		)

		return {
			transactions: result,
		}
	}
}
