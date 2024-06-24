import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { PaymentMethod } from '@modules/payment-methods/entities/payment-method'
import type { PaymentMethodsRepository } from '@modules/payment-methods/repositories/payment-methods-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	userId: string
	name: string
}

interface Output {
	paymentMethod: PaymentMethod
}

export class SavePaymentMethodUseCase {
	constructor(
		private readonly paymentMethodsRepository: PaymentMethodsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({
		id,
		userId,
		name,
	}: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const previusPaymentMethod = await this.paymentMethodsRepository.findById(id)

		if (!previusPaymentMethod) {
			throw new AppError({
				code: 'payment_method.not_found',
			})
		}

		const paymentMethod = PaymentMethod.create(
			{
				userId,
				name,
				createdAt: previusPaymentMethod.createdAt,
				updatedAt: new Date(),
				deletedAt: previusPaymentMethod.deletedAt,
			},
			new UniqueEntityID(id),
		)

		await this.paymentMethodsRepository.save(paymentMethod)

		return {
			paymentMethod,
		}
	}
}
