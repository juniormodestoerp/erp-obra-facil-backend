import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IReceivedAccounts {
	id: string
	name: string
	description: string
	totalAmount: number
	transactionDate: string
	status: string
}

interface Output {
	transactions: IReceivedAccounts[]
}

export class ReceivedAccountsUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
				status: 'receivable', // Supondo que 'receivable' é o valor que indica que a conta é a receber
			},
			select: {
				id: true,
				name: true,
				description: true,
				totalAmount: true,
				transactionDate: true,
				status: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const formattedTransactions: IReceivedAccounts[] = transactions.map(
			(transaction) => ({
				...transaction,
				transactionDate: transaction.transactionDate.toISOString(),
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
