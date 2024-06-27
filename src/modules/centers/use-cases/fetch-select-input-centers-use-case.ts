import { AppError } from '@core/domain/errors/app-error'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'
import type { DomainCentersRepository } from '@modules/centers/repositories/domain-centers-repository'

interface Output {
	centers: ISelectInputDTO[]
}

export class FetchSelectInputCentersUseCase {
	constructor(private readonly centersRepository: DomainCentersRepository) {}

	async execute(): Promise<Output> {
		const centers = await this.centersRepository.selectInput()

		if (centers.length === 0) {
			throw new AppError({
				code: 'cost_and_profit_center.not_found',
			})
		}

		return {
			centers,
		}
	}
}
