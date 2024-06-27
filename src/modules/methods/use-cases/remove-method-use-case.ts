import { AppError } from '@core/domain/errors/app-error'

import type { DomainMethodsRepository } from '@modules/methods/repositories/domain-methods-repository'

interface Input {
	id: string
}

export class RemoveMethodUseCase {
	constructor(
		private readonly paymentMethodsRepository: DomainMethodsRepository,
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
