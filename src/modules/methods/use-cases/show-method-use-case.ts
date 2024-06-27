import { AppError } from '@core/domain/errors/app-error'

import type { Method } from '@modules/methods/entities/method'
import type { PaymentMethodsRepository } from '@modules/methods/repositories/methods-repository'

interface Input {
	id: string
}

interface Output {
	method: Method
}

export class ShowPaymentMethodUseCase {
	constructor(
		private readonly paymentMethodsRepository: PaymentMethodsRepository,
	) {}

	async execute({ id }: Input): Promise<Output> {
		const method = await this.paymentMethodsRepository.findById(id)

		if (!method) {
			throw new AppError({
				code: 'payment_method.not_found',
			})
		}

		return {
			method,
		}
	}
}
