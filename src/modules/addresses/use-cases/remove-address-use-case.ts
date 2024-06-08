import { AppError } from '@core/domain/errors/app-error'

import type { AddressesRepository } from '@modules/addresses/repositories/address-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	userId: string
}

export class RemoveAddressUseCase {
	constructor(
		private readonly addressRepository: AddressesRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({
		id,
		userId,
	}: Input): Promise<void> {
		const user = await this.usersRepository.findById({ userId })

		if (!user || user.deletedAt !== null) {
			throw new AppError({
				code: 'user.not_found'
			})
		}

		const address = await this.addressRepository.findById({ id })

		if (!address || address.deletedAt !== null) {
			throw new AppError({
				code: 'address.not_found'
			})
		}

		await this.addressRepository.remove({
			id,
		})
	}
}
