import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Center } from '@modules/centers/entities/center'
import type { DomainCentersRepository } from '@modules/centers/repositories/domain-centers-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	userId: string
	name: string
}

interface Output {
	center: Center
}

export class SaveCenterUseCase {
	constructor(
		private readonly centersRepository: DomainCentersRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({ id, userId, name }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const previusCenter = await this.centersRepository.findById(id)

		if (!previusCenter) {
			throw new AppError({
				code: 'cost_and_profit_center.not_found',
			})
		}

		const center = Center.create(
			{
				userId,
				name,
				createdAt: previusCenter.createdAt,
				updatedAt: new Date(),
				deletedAt: previusCenter.deletedAt,
			},
			new UniqueEntityID(id),
		)

		await this.centersRepository.save(center)

		return {
			center,
		}
	}
}
