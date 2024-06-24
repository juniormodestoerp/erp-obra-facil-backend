import { AppError } from '@core/domain/errors/app-error'

import type { CostAndProfitCenter } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'
import type { CostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/cost-and-profit-centers-repository'

interface Input {
	id: string
}

interface Output {
	costAndProfitCenter: CostAndProfitCenter
}

export class ShowCostAndProfitCenterUseCase {
	constructor(
		private readonly costAndProfitCentersRepository: CostAndProfitCentersRepository,
	) {}

	async execute({ id }: Input): Promise<Output> {
		const costAndProfitCenter = await this.costAndProfitCentersRepository.findById(id)

		if (!costAndProfitCenter) {
			throw new AppError({
				code: 'cost_and_profit_center.not_found',
			})
		}

		return {
			costAndProfitCenter,
		}
	}
}
