import { AppError } from '@core/domain/errors/app-error'

import type { PaymentMethodsRepository } from '@modules/payment-methods/repositories/payment-methods-repository'

interface Input {
	id: string
}

export class RemovePaymentMethodUseCase {
	constructor(
		private readonly paymentMethodsRepository: PaymentMethodsRepository,
	) {}

	async execute({ id }: Input): Promise<void> {
		const paymentMethod = await this.paymentMethodsRepository.findById(id)

		if (!paymentMethod) {
			throw new AppError({
				code: 'payment_method.not_found',
			})
		}

		await this.paymentMethodsRepository.remove(id)
	}
}
