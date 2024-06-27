import { AppError } from '@core/domain/errors/app-error'

import { Method } from '@modules/methods/entities/method'
import type { PaymentMethodsRepository } from '@modules/methods/repositories/methods-repository'

interface Input {
	userId: string
	name: string
}

interface Output {
	method: Method
}

export class CreatePaymentMethodUseCase {
	constructor(
		private readonly paymentMethodsRepository: PaymentMethodsRepository,
	) {}

	async execute({ userId, name }: Input): Promise<Output> {
		const existsPaymentMethod =
			await this.paymentMethodsRepository.findByName(name)

		if (existsPaymentMethod) {
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
