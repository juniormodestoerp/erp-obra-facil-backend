import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEntriesByContact {
	id: string
	contact: string | null
	name: string
	totalAmount: number
	transactionDate: string
}

interface Output {
	transactions: IEntriesByContact[]
}

export class EntriesByContactUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				contact: true,
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

		const formattedTransactions: IEntriesByContact[] = transactions.map(
			(transaction) => ({
				...transaction,
				contact: transaction.contact || 'Contato não informado',
				transactionDate: transaction.transactionDate.toISOString(),
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
