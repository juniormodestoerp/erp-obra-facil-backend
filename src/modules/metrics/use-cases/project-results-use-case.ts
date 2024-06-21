import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface IProjectResult {
	id: string
	project: string | null
	totalAmount: number
}

interface Output {
	transactions: IProjectResult[]
}

export class ProjectResultsUseCase {
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
				const project = transaction.associatedProjects || 'unknown'
				if (!acc[project]) {
					acc[project] = { totalAmount: 0, ids: [] }
				}
				acc[project].totalAmount += transaction.totalAmount
				acc[project].ids.push(transaction.id)
				return acc
			},
			{} as Record<string, { totalAmount: number, ids: string[] }>,
		)

		const result: IProjectResult[] = Object.keys(totalsByProject).map(
			(project) => ({
				id: totalsByProject[project].ids.join(', '),
				project: project === 'unknown' ? null : project,
				totalAmount: totalsByProject[project].totalAmount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
