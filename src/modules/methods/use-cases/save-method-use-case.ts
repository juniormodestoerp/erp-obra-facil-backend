import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Method } from '@modules/methods/entities/method'
import type { DomainMethodsRepository } from '@modules/methods/repositories/domain-methods-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	userId: string
	name: string
}

interface Output {
	method: Method
}

export class SaveMethodUseCase {
	constructor(
		private readonly paymentMethodsRepository: DomainMethodsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({ id, userId, name }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const previusMethod = await this.paymentMethodsRepository.findById(id)

		if (!previusMethod) {
			throw new AppError({
				code: 'payment_method.not_found',
			})
		}

		const method = Method.create(
			{
				userId,
				name,
				createdAt: previusMethod.createdAt,
				updatedAt: new Date(),
				deletedAt: previusMethod.deletedAt,
			},
			new UniqueEntityID(id),
		)

		await this.paymentMethodsRepository.save(method)

		return {
			method,
		}
	}
}
