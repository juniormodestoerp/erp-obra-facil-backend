import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ITotalsByProject {
	id: string
	associatedProject: string | null
	amount: number
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
				project: true,
				amount: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const totalsByProject = transactions.reduce(
			(acc, transaction) => {
				const associatedProject = transaction.project || 'Não informado'
				if (!acc[associatedProject]) {
					acc[associatedProject] = { amount: 0, ids: [] }
				}
				acc[associatedProject].amount += transaction.amount
				acc[associatedProject].ids.push(transaction.id)
				return acc
			},
			{} as Record<string, { amount: number; ids: string[] }>,
		)

		const result: ITotalsByProject[] = Object.keys(totalsByProject).map(
			(associatedProject) => ({
				id: totalsByProject[associatedProject].ids.join(', '),
				associatedProject:
					associatedProject === 'Não informado' ? null : associatedProject,
				amount: totalsByProject[associatedProject].amount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
