import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ITotalsByProject {
	id: string
	project: string | null
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
				const project = transaction.project || 'Não informado'
				if (!acc[project]) {
					acc[project] = { amount: 0, ids: [] }
				}
				acc[project].amount += transaction.amount
				acc[project].ids.push(transaction.id)
				return acc
			},
			{} as Record<string, { amount: number; ids: string[] }>,
		)

		const result: ITotalsByProject[] = Object.keys(totalsByProject).map(
			(project) => ({
				id: totalsByProject[project].ids.join(', '),
				project: project === 'Não informado' ? null : project,
				amount: totalsByProject[project].amount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
