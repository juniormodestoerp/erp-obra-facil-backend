import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IPaidAccounts {
	id: string
	name: string
	description: string
	totalAmount: number
	transactionDate: string
	status: string
}

interface Output {
	transactions: IPaidAccounts[]
}

export class PaidAccountsUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
				totalAmount: {
					lt: 0,
				},
				status: 'paid',
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

		const formattedTransactions: IPaidAccounts[] = transactions.map(
			(transaction) => ({
				id: transaction.id,
				name: transaction.name,
				description: transaction.description,
				totalAmount: transaction.totalAmount,
				transactionDate: transaction.transactionDate.toISOString(),
				status: transaction.status,
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
