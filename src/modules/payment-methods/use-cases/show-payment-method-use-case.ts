import { AppError } from '@core/domain/errors/app-error'

import type { PaymentMethod } from '@modules/payment-methods/entities/payment-method'
import type { PaymentMethodsRepository } from '@modules/payment-methods/repositories/payment-methods-repository'

interface Input {
	id: string
}

interface Output {
	paymentMethod: PaymentMethod
}

export class ShowPaymentMethodUseCase {
	constructor(
		private readonly paymentMethodsRepository: PaymentMethodsRepository,
	) {}

	async execute({ id }: Input): Promise<Output> {
		const paymentMethod = await this.paymentMethodsRepository.findById(id)

		if (!paymentMethod) {
			throw new AppError({
				code: 'payment_method.not_found',
			})
		}

		return {
			paymentMethod,
		}
	}
}
