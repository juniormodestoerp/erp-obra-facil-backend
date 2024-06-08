import { AppError } from '@core/domain/errors/app-error'

import type { Address } from '@modules/addresses/entities/address'
import type { AddressesRepository } from '@modules/addresses/repositories/address-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	userId: string
}

interface Output {
	address: Address
}

export class ShowMainAddressUseCase {
	constructor(
		private readonly addressRepository: AddressesRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({ userId }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({ userId })

		if (!user || user.deletedAt !== null) {
			throw new AppError({
				code: 'user.not_found'
			})
		}

		const address = await this.addressRepository.findMainAddress({ userId })

		if (!address || address.deletedAt !== null) {
			throw new AppError({
				code: 'address.not_found'
			})
		}

		return {
			address,
		}
	}
}
