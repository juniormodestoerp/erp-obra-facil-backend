import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { CostAndProfitCenter } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'
import type { CostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/cost-and-profit-centers-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	userId: string
	name: string
}

interface Output {
	costAndProfitCenter: CostAndProfitCenter
}

export class SaveCostAndProfitCenterUseCase {
	constructor(
		private readonly costAndProfitCentersRepository: CostAndProfitCentersRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({
		id,
		userId,
		name,
	}: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const previusCostAndProfitCenter = await this.costAndProfitCentersRepository.findById(id)

		if (!previusCostAndProfitCenter) {
			throw new AppError({
				code: 'cost_and_profit_center.not_found',
			})
		}

		const costAndProfitCenter = CostAndProfitCenter.create(
			{
				userId,
				name,
				createdAt: previusCostAndProfitCenter.createdAt,
				updatedAt: new Date(),
				deletedAt: previusCostAndProfitCenter.deletedAt,
			},
			new UniqueEntityID(id),
		)

		await this.costAndProfitCentersRepository.save(costAndProfitCenter)

		return {
			costAndProfitCenter,
		}
	}
}
