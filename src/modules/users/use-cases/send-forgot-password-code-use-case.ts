import { randomUUID } from 'node:crypto'

import { AppError } from '@core/domain/errors/app-error'
import { Utils } from '@core/utils/string'

import type { User } from '@modules/users/entities/user'
import { UserToken } from '@modules/users/entities/user-token'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'
import type { DomainUserTokensRepository } from '@modules/users/repositories/user-tokens-repository'

import type { Queue } from '@shared/infra/providers/queue'
import { jobs } from '@shared/infra/queue/jobs'

interface Input {
	protocol: string
	hostname: string
	document: string | null
	email: string | null
}

export class SendForgotPasswordCodeUseCase {
	constructor(
		private readonly usersRepository: DomainUsersRepository,
		private readonly userTokenRepository: DomainUserTokensRepository,
		private readonly queueProvider: Queue,
	) {}

	async execute({ protocol, document, email }: Input): Promise<void> {
		if ((document && email) || (!document && !email)) {
			throw new AppError({
				code: 'authenticate.invalid_credentials',
			})
		}

		let user: User | null = null

		if (document && !email) {
			user = await this.usersRepository.findByDocument(document)
		} else if (email && !document) {
			user = await this.usersRepository.findByEmail(email)
		}

		if (user === null) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		if (
			(email && user.email !== email) ||
			(document && user.document !== document)
		) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const code = Utils.GenerateRandomCode(6)

		const userToken = UserToken.create({
			userId: user.id,
			token: randomUUID(),
			code,
			usage: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			user: null,
		})

		await this.userTokenRepository.create(userToken)

		const resetPasswordLink = new URL(
			`${protocol}://localhost:3000/reset-password`,
		)
		resetPasswordLink.searchParams.set('token', userToken.token)
		resetPasswordLink.searchParams.set('code', userToken.code)

		this.queueProvider.add(jobs.SendForgotPasswordCode.key, {
			email: user.email,
			name: user.name,
			resetPasswordLink,
		})
	}
}
