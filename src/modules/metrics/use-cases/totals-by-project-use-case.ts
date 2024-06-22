import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ITotalsByProject {
	id: string
	associatedProject: string | null
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
				const associatedProject = transaction.associatedProjects || 'uncategorized'
				if (!acc[associatedProject]) {
					acc[associatedProject] = { totalAmount: 0, ids: [] }
				}
				acc[associatedProject].totalAmount += transaction.totalAmount
				acc[associatedProject].ids.push(transaction.id)
				return acc
			},
			{} as Record<string, { totalAmount: number; ids: string[] }>,
		)

		const result: ITotalsByProject[] = Object.keys(totalsByProject).map(
			(associatedProject) => ({
				id: totalsByProject[associatedProject].ids.join(', '),
				associatedProject: associatedProject === 'uncategorized' ? null : associatedProject,
				totalAmount: totalsByProject[associatedProject].totalAmount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
