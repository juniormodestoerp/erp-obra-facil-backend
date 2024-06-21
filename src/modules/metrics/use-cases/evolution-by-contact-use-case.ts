import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEvolution {
	date: string
	totalAmount: number
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
					acc[contact] = { totalAmounts: {}, ids: [] }
				}

				if (!acc[contact].totalAmounts[date]) {
					acc[contact].totalAmounts[date] = 0
				}

				acc[contact].totalAmounts[date] += transaction.totalAmount
				acc[contact].ids.push(transaction.id)
				return acc
			},
			{} as Record<
				string,
				{ totalAmounts: Record<string, number>; ids: string[] }
			>,
		)

		const result: IContactEvolution[] = Object.keys(evolutionByContact).map(
			(contact) => ({
				id: evolutionByContact[contact].ids.join(', '),
				contact: contact === 'unknown' ? null : contact,
				evolution: Object.keys(evolutionByContact[contact].totalAmounts).map(
					(date) => ({
						date,
						totalAmount: evolutionByContact[contact].totalAmounts[date],
					}),
				),
			}),
		)

		return {
			transactions: result,
		}
	}
}
