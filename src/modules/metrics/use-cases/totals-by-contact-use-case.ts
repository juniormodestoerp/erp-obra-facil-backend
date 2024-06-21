import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IContactTotal {
	contact: string | null
	totalAmount: number
}

interface Output {
	transactions: IContactTotal[]
}

export class TotalsByContactUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
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
					acc[contact] = 0
				}
				acc[contact] += transaction.totalAmount
				return acc
			},
			{} as Record<string, number>,
		)

		const result: IContactTotal[] = Object.keys(totalsByContact).map(
			(contact) => ({
				contact: contact === 'unknown' ? null : contact,
				totalAmount: totalsByContact[contact],
			}),
		)

		return {
			transactions: result,
		}
	}
}
