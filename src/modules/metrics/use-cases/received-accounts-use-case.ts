import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IReceivedAccounts {
	id: string
	description: string
	amount: number
	date: string
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
				amount: {
					gt: 0,
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

		const formattedTransactions: IReceivedAccounts[] = transactions.map(
			(transaction) => ({
				...transaction,
				date: transaction.date.toISOString(),
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
