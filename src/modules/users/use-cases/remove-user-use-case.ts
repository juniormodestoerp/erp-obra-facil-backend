import { AppError } from '@core/domain/errors/app-error'

import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	userId: string
}

export class RemoveUserUseCase {
	constructor(private usersRepository: DomainUsersRepository) {}

	async execute({ userId }: Input): Promise<void> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		await this.usersRepository.remove({
			userId,
		})
	}
}
