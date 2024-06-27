import { AppError } from '@core/domain/errors/app-error'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
}

interface ITotalsByCenter {
	id: string
	center: string | null
	amount: number
}

interface Output {
	transactions: ITotalsByCenter[]
}

export class TotalsByCenterUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				center: {
					select: {
						id: true,
						name: true,
					},
				},
				amount: true,
			},
		})

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const totalsByCenter = transactions.reduce(
			(acc, transaction) => {
				const centerId = transaction.center
					? transaction.center.name
					: 'Não informado'
				if (!acc[centerId]) {
					acc[centerId] = { amount: 0, ids: [] }
				}
				acc[centerId].amount += transaction.amount
				acc[centerId].ids.push(transaction.id)
				return acc
			},
			{} as Record<string, { amount: number; ids: string[] }>,
		)

		const result: ITotalsByCenter[] = Object.keys(totalsByCenter).map(
			(centerId) => ({
				id: totalsByCenter[centerId].ids.join(', '),
				center: centerId === 'Não informado' ? null : centerId,
				amount: totalsByCenter[centerId].amount,
			}),
		)

		return {
			transactions: result,
		}
	}
}
