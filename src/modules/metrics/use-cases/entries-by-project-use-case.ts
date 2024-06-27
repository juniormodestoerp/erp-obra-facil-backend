import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEntriesByProject {
	id: string
	project: string | null
	description: string
	amount: number
	date: string
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
				project: true,
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

		const formattedTransactions: IEntriesByProject[] = transactions.map(
			(transaction) => ({
				...transaction,
				project: transaction.project ?? 'Projeto não informado',
				date: transaction.date.toISOString(),
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
