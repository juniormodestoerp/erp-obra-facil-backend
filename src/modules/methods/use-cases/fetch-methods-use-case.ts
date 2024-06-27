import { AppError } from '@core/domain/errors/app-error'

import type { Method } from '@modules/methods/entities/method'
import type { DomainMethodsRepository } from '@modules/methods/repositories/domain-methods-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	userId: string
}

interface Output {
	paymentMethods: Method[]
}

export class FetchMethodsUseCase {
	constructor(
		private readonly paymentMethodsRepository: DomainMethodsRepository,
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

		const paymentMethods = await this.paymentMethodsRepository.findMany(userId)

		if (paymentMethods.length === 0) {
			throw new AppError({
				code: 'payment_method.not_found',
			})
		}

		return {
			paymentMethods,
		}
	}
}
