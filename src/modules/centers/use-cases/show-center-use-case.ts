import { AppError } from '@core/domain/errors/app-error'

import type { Center } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'
import type { CostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/cost-and-profit-centers-repository'

interface Input {
	id: string
}

interface Output {
	center: Center
}

export class ShowCostAndProfitCenterUseCase {
	constructor(
		private readonly costAndProfitCentersRepository: CostAndProfitCentersRepository,
	) {}

	async execute({ id }: Input): Promise<Output> {
		const center = await this.costAndProfitCentersRepository.findById(id)

		if (!center) {
			throw new AppError({
				code: 'cost_and_profit_center.not_found',
			})
		}

		return {
			center,
		}
	}
}
