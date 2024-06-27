import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IAccountsPayable {
	id: string
	description: string
	amount: number
	date: string
	tags: string[]
	method: string | null
}

interface Output {
	transactions: IAccountsPayable[]
}

export class AccountsPayableUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
				amount: {
					lt: 0,
				},
				date: {
					gt: new Date(),
				},
			},
			select: {
				id: true,
				description: true,
				amount: true,
				date: true,
				tags: true,
				method: true,
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
				description: transaction.description,
				amount: transaction.amount,
				date: transaction.date.toISOString(),
				tags: transaction.tags.map((tag) => tag.name),
				method: transaction.method ? transaction.method.name : null,
			}),
		)

		return {
			transactions: formattedTransactions,
		}
	}
}
