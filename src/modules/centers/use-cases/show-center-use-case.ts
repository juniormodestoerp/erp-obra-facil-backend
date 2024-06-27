import { AppError } from '@core/domain/errors/app-error'

import type { Center } from '@modules/centers/entities/center'
import type { DomainCentersRepository } from '@modules/centers/repositories/domain-centers-repository'

interface Input {
	id: string
}

interface Output {
	center: Center
}

export class ShowCenterUseCase {
	constructor(private readonly centersRepository: DomainCentersRepository) {}

	async execute({ id }: Input): Promise<Output> {
		const center = await this.centersRepository.findById(id)

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
