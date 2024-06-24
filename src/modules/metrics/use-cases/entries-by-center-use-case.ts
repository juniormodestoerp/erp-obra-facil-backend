import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEntriesByCenter {
	id: string
	costAndProfitCenters: string | null
	totalAmount: number
	transactionDate: string
	name: string
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
				costAndProfitCenters: true,
				totalAmount: true,
				transactionDate: true,
				name: true,
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
				costAndProfitCenters:
					transaction.costAndProfitCenters || 'Centro não informado',
				transactionDate: transaction.transactionDate.toISOString(),
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
