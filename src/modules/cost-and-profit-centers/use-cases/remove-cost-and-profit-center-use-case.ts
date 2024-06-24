import { AppError } from '@core/domain/errors/app-error'

import type { CostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/cost-and-profit-centers-repository'

interface Input {
	id: string
}

export class RemoveCostAndProfitCenterUseCase {
	constructor(
		private readonly costAndProfitCentersRepository: CostAndProfitCentersRepository,
	) {}

	async execute({ id }: Input): Promise<void> {
		const costAndProfitCenter = await this.costAndProfitCentersRepository.findById(id)

		if (!costAndProfitCenter) {
			throw new AppError({
				code: 'cost_and_profit_center.not_found',
			})
		}

		await this.costAndProfitCentersRepository.remove(id)
	}
}
