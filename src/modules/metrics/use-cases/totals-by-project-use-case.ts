import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ITotalsByProject {
	id: string
	projectId: string | null
	totalAmount: number
}

interface Output {
	transactions: ITotalsByProject[]
}

export class TotalsByProjectUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				associatedProjects: true,
				totalAmount: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const totalsByProject = transactions.reduce(
			(acc, transaction) => {
				const projectId = transaction.associatedProjects || 'uncategorized'
				if (!acc[projectId]) {
					acc[projectId] = { totalAmount: 0, ids: [] }
				}
				acc[projectId].totalAmount += transaction.totalAmount
				acc[projectId].ids.push(transaction.id)
				return acc
			},
			{} as Record<string, { totalAmount: number; ids: string[] }>,
		)

		const result: ITotalsByProject[] = Object.keys(totalsByProject).map(
			(projectId) => ({
				id: totalsByProject[projectId].ids.join(', '),
				projectId: projectId === 'uncategorized' ? null : projectId,
				totalAmount: totalsByProject[projectId].totalAmount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
