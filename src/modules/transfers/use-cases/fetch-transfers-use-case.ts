import { AppError } from '@core/domain/errors/app-error'

import type { Transfer } from '@modules/transfers/entities/transfer'
import type { TransfersRepository } from '@modules/transfers/repositories/transfers-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	userId: string
}

interface Output {
	transfers: Transfer[]
}

export class FetchTransfersUseCase {
	constructor(
		private readonly transfersRepository: TransfersRepository,
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

		const transfers = await this.transfersRepository.findMany(userId)

		if (transfers.length === 0) {
			throw new AppError({
				code: 'transfers.not_found',
			})
		}

		return {
			transfers,
		}
	}
}
