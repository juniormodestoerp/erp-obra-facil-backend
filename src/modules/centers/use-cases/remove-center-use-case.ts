import { AppError } from '@core/domain/errors/app-error'

import type { DomainCentersRepository } from '@modules/centers/repositories/domain-centers-repository'

interface Input {
	id: string
}

export class RemoveCenterUseCase {
	constructor(private readonly centersRepository: DomainCentersRepository) {}

	async execute({ id }: Input): Promise<void> {
		const center = await this.centersRepository.findById(id)

		if (!center) {
			throw new AppError({
				code: 'cost_and_profit_center.not_found',
			})
		}

		await this.centersRepository.remove(id)
	}
}
