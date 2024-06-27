import { AppError } from '@core/domain/errors/app-error'

import { Method } from '@modules/methods/entities/method'
import type { DomainMethodsRepository } from '@modules/methods/repositories/domain-methods-repository'

interface Input {
	userId: string
	name: string
}

interface Output {
	method: Method
}

export class CreateMethodUseCase {
	constructor(
		private readonly paymentMethodsRepository: DomainMethodsRepository,
	) {}

	async execute({ userId, name }: Input): Promise<Output> {
		const existsMethod = await this.paymentMethodsRepository.findByName(name)

		if (existsMethod) {
			throw new AppError({
				code: 'payment_method.already_exists',
			})
		}

		const method = Method.create({
			userId,
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})

		await this.paymentMethodsRepository.create(method)

		return {
			method,
		}
	}
}
