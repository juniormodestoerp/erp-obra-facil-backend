import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IPaidAccounts {
	id: string
	description: string
	amount: number
	date: string
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
				amount: {
					lt: 0,
				},
				status: 'paid',
			},
			select: {
				id: true,
				description: true,
				amount: true,
				date: true,
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
				description: transaction.description,
				amount: transaction.amount,
				date: transaction.date.toISOString(),
				status: transaction.status,
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
