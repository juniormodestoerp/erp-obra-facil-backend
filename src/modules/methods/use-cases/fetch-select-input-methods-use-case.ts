import { AppError } from '@core/domain/errors/app-error'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'
import type { DomainMethodsRepository } from '@modules/methods/repositories/domain-methods-repository'

interface Output {
	paymentMethods: ISelectInputDTO[]
}

export class FetchSelectInputMethodsUseCase {
	constructor(
		private readonly paymentMethodsRepository: DomainMethodsRepository,
	) {}

	async execute(): Promise<Output> {
		const paymentMethods = await this.paymentMethodsRepository.selectInput()

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
