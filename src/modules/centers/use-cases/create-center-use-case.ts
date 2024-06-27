import { AppError } from '@core/domain/errors/app-error'

import { Center } from '@modules/centers/entities/center'
import type { DomainCentersRepository } from '@modules/centers/repositories/domain-centers-repository'

interface Input {
	userId: string
	name: string
}

interface Output {
	center: Center
}

export class CreateCostAndProfitCenterUseCase {
	constructor(private readonly centersRepository: DomainCentersRepository) {}

	async execute({ userId, name }: Input): Promise<Output> {
		const existsCostAndProfitCenter =
			await this.centersRepository.findByName(name)

		if (existsCostAndProfitCenter) {
			throw new AppError({
				code: 'cost_and_profit_center.already_exists',
			})
		}

		const center = Center.create({
			userId,
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})

		await this.centersRepository.create(center)

		return {
			center,
		}
	}
}
