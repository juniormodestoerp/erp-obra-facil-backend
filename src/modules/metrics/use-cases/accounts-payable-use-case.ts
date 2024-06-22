import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IAccountsPayable {
	id: string
	name: string
	totalAmount: number
	transactionDate: string
	tags: string | null
	paymentMethod: string
}

interface Output {
	transactions: IAccountsPayable[]
}

export class AccountsPayableUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
				totalAmount: {
					lt: 0,
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

		const formattedTransactions: IAccountsPayable[] = transactions.map(
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
