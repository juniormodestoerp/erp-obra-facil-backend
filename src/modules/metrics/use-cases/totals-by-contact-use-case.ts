import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ITotalsByContact {
	id: string
	contact: string | null
	totalAmount: number
}

interface Output {
	transactions: ITotalsByContact[]
}

export class TotalsByContactUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				contact: true,
				totalAmount: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const totalsByContact = transactions.reduce(
			(acc, transaction) => {
				const contact = transaction.contact || 'unknown'
				if (!acc[contact]) {
					acc[contact] = { totalAmount: 0, ids: [] }
				}
				acc[contact].totalAmount += transaction.totalAmount
				acc[contact].ids.push(transaction.id)
				return acc
			},
			{} as Record<string, { totalAmount: number; ids: string[] }>,
		)

		const result: ITotalsByContact[] = Object.keys(totalsByContact).map(
			(contact) => ({
				id: totalsByContact[contact].ids.join(', '),
				contact: contact === 'unknown' ? null : contact,
				totalAmount: totalsByContact[contact].totalAmount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
