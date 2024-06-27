import { AppError } from '@core/domain/errors/app-error'

import { CostAndProfitCenter } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'
import type { CostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/cost-and-profit-centers-repository'

interface Input {
	userId: string
	name: string
}

interface Output {
	costAndProfitCenter: CostAndProfitCenter
}

export class CreateCostAndProfitCenterUseCase {
	constructor(
		private readonly costAndProfitCentersRepository: CostAndProfitCentersRepository,
	) {}

	async execute({ userId, name }: Input): Promise<Output> {
		const existsCostAndProfitCenter =
			await this.costAndProfitCentersRepository.findByName(name)

		if (existsCostAndProfitCenter) {
			throw new AppError({
				code: 'cost_and_profit_center.already_exists',
			})
		}

		const costAndProfitCenter = CostAndProfitCenter.create({
			userId,
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})

		await this.costAndProfitCentersRepository.create(costAndProfitCenter)

		return {
			costAndProfitCenter,
		}
	}
}
