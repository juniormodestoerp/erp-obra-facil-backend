import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IEntriesByContact {
	id: string
	contact: string | null
	description: string
	amount: number
	date: string
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

		const formattedTransactions: IEntriesByContact[] = transactions.map(
			(transaction) => ({
				...transaction,
				contact: transaction.contact || 'Contato não informado',
				date: transaction.date.toISOString(),
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
