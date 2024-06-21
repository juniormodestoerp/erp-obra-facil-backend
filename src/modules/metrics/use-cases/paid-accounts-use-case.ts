import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IPaidAccounts {
	id: string
	userId: string
	name: string
	description: string
	totalAmount: number
	transactionDate: Date
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
				status: 'paid',
			},
			select: {
				id: true,
				userId: true,
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

		return {
			transactions,
		}
	}
}
