import { AppError } from '@core/domain/errors/app-error'

import type { PaymentMethodsRepository } from '@modules/methods/repositories/methods-repository'

interface Input {
	id: string
}

export class RemovePaymentMethodUseCase {
	constructor(
		private readonly paymentMethodsRepository: PaymentMethodsRepository,
	) {}

	async execute({ id }: Input): Promise<void> {
		const method = await this.paymentMethodsRepository.findById(id)

		if (!method) {
			throw new AppError({
				code: 'payment_method.not_found',
			})
		}

		await this.paymentMethodsRepository.remove(id)
	}
}
