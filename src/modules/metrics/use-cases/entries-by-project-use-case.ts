import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEntriesByProject {
	id: string
	project: string | null
	name: string
	totalAmount: number
	transactionDate: string
}

interface Output {
	transactions: IEntriesByProject[]
}

export class EntriesByProjectUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				associatedProjects: true,
				name: true,
				totalAmount: true,
				transactionDate: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const formattedTransactions: IEntriesByProject[] = transactions.map(
			(transaction) => ({
				...transaction,
				project: transaction.associatedProjects || 'Projeto não informado',
				transactionDate: transaction.transactionDate.toISOString(),
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
