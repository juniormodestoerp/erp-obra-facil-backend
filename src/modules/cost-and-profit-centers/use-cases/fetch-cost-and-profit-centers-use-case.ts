import { AppError } from '@core/domain/errors/app-error'

import type { CostAndProfitCenter } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'
import type { CostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/cost-and-profit-centers-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	userId: string
}

interface Output {
	costAndProfitCenters: CostAndProfitCenter[]
}

export class FetchCostAndProfitCentersUseCase {
	constructor(
		private readonly costAndProfitCentersRepository: CostAndProfitCentersRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({ userId }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const costAndProfitCenters =
			await this.costAndProfitCentersRepository.findMany(userId)

		if (costAndProfitCenters.length === 0) {
			throw new AppError({
				code: 'cost_and_profit_center.not_found',
			})
		}

		return {
			costAndProfitCenters,
		}
	}
}
