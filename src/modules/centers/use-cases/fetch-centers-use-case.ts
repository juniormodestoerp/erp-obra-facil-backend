import { AppError } from '@core/domain/errors/app-error'

import type { Center } from '@modules/centers/entities/center'
import type { DomainCentersRepository } from '@modules/centers/repositories/domain-centers-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	userId: string
}

interface Output {
	centers: Center[]
}

export class FetchCentersUseCase {
	constructor(
		private readonly centersRepository: DomainCentersRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({ userId }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const centers = await this.centersRepository.findMany(userId)

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
