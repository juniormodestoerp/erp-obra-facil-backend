import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IAccountsReceivable {
	id: string
	name: string
	totalAmount: number
	transactionDate: string
	tags: string | null
	paymentMethod: string
}

interface Output {
	transactions: IAccountsReceivable[]
}

export class AccountsReceivableUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
				totalAmount: {
					gt: 0,
				},
				transactionDate: {
					gt: new Date(),
				},
			},
			select: {
				id: true,
				name: true,
				totalAmount: true,
				transactionDate: true,
				tags: true,
				paymentMethod: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const formattedTransactions: IAccountsReceivable[] = transactions.map(
			(transaction) => ({
				id: transaction.id,
				name: transaction.name,
				totalAmount: transaction.totalAmount,
				transactionDate: transaction.transactionDate.toISOString(),
				tags: transaction.tags,
				paymentMethod: transaction.paymentMethod,
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
