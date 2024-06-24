import { AppError } from '@core/domain/errors/app-error'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'
import type { CostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/cost-and-profit-centers-repository'

interface Output {
	costAndProfitCenters: ISelectInputDTO[]
}

export class FetchSelectInputCostAndProfitCentersUseCase {
	constructor(
		private readonly costAndProfitCentersRepository: CostAndProfitCentersRepository,
	) {}

	async execute(): Promise<Output> {
		const costAndProfitCenters = await this.costAndProfitCentersRepository.selectInput()

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
