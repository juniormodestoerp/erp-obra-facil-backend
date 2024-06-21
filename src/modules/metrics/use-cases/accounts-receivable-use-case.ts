import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IAccountsReceivable {
	id: string
	categoryId: string | null
	totalAmount: number
	transactionDate: string
}
interface Output {
	transactions: IAccountsReceivable[]
}
export class AccountsReceivableUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				categoryId: true,
				totalAmount: true,
				transactionDate: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const formattedTransactions: IAccountsReceivable[] = transactions.map(
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
