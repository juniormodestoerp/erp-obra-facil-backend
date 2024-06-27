import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEntriesByCategory {
	id: string
	category: string | null
	description: string
	amount: number
	date: string
}

interface Output {
	transactions: IEntriesByCategory[]
}

export class EntriesByCategoryUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				category: {
					select: {
						name: true,
					},
				},
				description: true,
				amount: true,
				date: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const formattedTransactions: IEntriesByCategory[] = transactions.map(
			(transaction) => ({
				...transaction,
				category: transaction.category?.name || 'Categoria não informada',
				date: transaction.date.toISOString(),
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
