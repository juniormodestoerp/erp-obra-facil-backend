import { AppError } from '@core/domain/errors/app-error'

import type { DomainAddressesRepository } from '@modules/addresses/repositories/domain-addresses-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	userId: string
	id: string
}

export class RemoveAddressUseCase {
	constructor(
		private readonly addressRepository: DomainAddressesRepository,
		private readonly usersRepository: DomainUsersRepository,
	) {}

	async execute({ id, userId }: Input): Promise<void> {
		const user = await this.usersRepository.findById({ userId })

		if (!user || user.deletedAt !== null) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const address = await this.addressRepository.findById({ id })

		if (!address || address.deletedAt !== null) {
			throw new AppError({
				code: 'address.not_found',
			})
		}

		await this.addressRepository.remove({
			id,
		})
	}
}
