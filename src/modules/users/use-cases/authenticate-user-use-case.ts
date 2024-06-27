import { AppError } from '@core/domain/errors/app-error'

import type { User } from '@modules/users/entities/user'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

import type { Hash } from '@shared/infra/providers/hash'

interface Input {
	document: string
	password: string
}

interface Output {
	user: User
}

export class AuthenticateUserUseCase {
	constructor(
		private usersRepository: DomainUsersRepository,
		private hash: Hash,
	) {}

	async execute({ document, password }: Input): Promise<Output> {
		const user = await this.usersRepository.findByDocument(document)
		if (!user) {
			throw new AppError({
				code: 'authenticate.invalid_credentials',
			})
		}

		if (!user.password) {
			throw new AppError({
				code: 'authenticate.invalid_credentials',
			})
		}

		const doesPasswordMatches = await this.hash.compare(password, user.password)
		if (!doesPasswordMatches) {
			throw new AppError({
				code: 'authenticate.invalid_credentials',
			})
		}

		return {
			user,
		}
	}
}
