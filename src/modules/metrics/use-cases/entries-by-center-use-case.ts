import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEntriesByCenter {
	id: string
	center: string | null
	amount: number
	date: string
	description: string
}

interface Output {
	transactions: IEntriesByCenter[]
}

export class EntriesByCenterUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				center: true,
				amount: true,
				date: true,
				description: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
				message: 'No transactions found for the given user.',
			})
		}

		const formattedTransactions: IEntriesByCenter[] = transactions.map(
			(transaction) => ({
				...transaction,
				center: transaction.center?.name ?? 'Centro não informado',
				date: transaction.date.toISOString(),
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
