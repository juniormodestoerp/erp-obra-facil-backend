import { AppError } from '@core/domain/errors/app-error'

import { PaymentMethod } from '@modules/payment-methods/entities/payment-method'
import type { PaymentMethodsRepository } from '@modules/payment-methods/repositories/payment-methods-repository'

interface Input {
	userId: string
	name: string
}

interface Output {
	paymentMethod: PaymentMethod
}

export class CreatePaymentMethodUseCase {
	constructor(private readonly paymentMethodsRepository: PaymentMethodsRepository) {}

	async execute({ userId, name }: Input): Promise<Output> {
		const existsPaymentMethod = await this.paymentMethodsRepository.findByName(name)

		if (existsPaymentMethod) {
			throw new AppError({
				code: 'payment_method.already_exists',
			})
		}

		const paymentMethod = PaymentMethod.create({
			userId,
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})

		await this.paymentMethodsRepository.create(paymentMethod)

		return {
			paymentMethod,
		}
	}
}
