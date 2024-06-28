import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ICashEntries {
	id: string
	amount: number
	// tags: string[]
	description: string
	method: string | null
	date: string
}

interface Output {
	transactions: ICashEntries[]
}

export class CashEntriesUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				amount: true,
				// tags: true,
				description: true,
				method: true,
				date: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const formattedTransactions: ICashEntries[] = transactions.map(
			(transaction) => ({
				...transaction,
				// tags: transaction.tags.map((tag) => tag.name),
				date: transaction.date.toISOString(),
				method: transaction.method ? transaction.method.name : null,
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
