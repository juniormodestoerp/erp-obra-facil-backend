import { AppError } from '@core/domain/errors/app-error'

import type { Address } from '@modules/addresses/entities/address'
import type { DomainAddressesRepository } from '@modules/addresses/repositories/domain-addresses-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	userId: string
}

interface Output {
	address: Address
}

export class ShowAddressUseCase {
	constructor(
		private readonly addressRepository: DomainAddressesRepository,
		private readonly usersRepository: DomainUsersRepository,
	) {}

	async execute({ userId }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({ userId })

		if (!user || user.deletedAt !== null) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const address = await this.addressRepository.findByUserId({ userId })

		if (!address || address.deletedAt !== null) {
			throw new AppError({
				code: 'address.not_found',
			})
		}

		return {
			address,
		}
	}
}
