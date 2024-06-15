import { AppError } from '@core/domain/errors/app-error'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import type { AddressesRepository } from '@modules/addresses/repositories/address-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'
import { Address } from '@modules/addresses/entities/address'

interface Input {
	id: string
	userId: string
	zipCode: string
	state: string
	city: string
	neighborhood: string
	street: string
	number: string
	complement?: string
}

interface Output {
	address: Address
}

export class SaveAddressUseCase {
	constructor(
		private readonly addressRepository: AddressesRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({
		id,
		userId,
		zipCode,
		state,
		city,
		neighborhood,
		street,
		number,
		complement,
	}: Input): Promise<Output> {
		const user = await this.usersRepository.findById({ userId })

		if (!user || user.deletedAt !== null) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const address = Address.create(
			{
				userId,
				zipCode,
				state,
				city,
				neighborhood,
				street,
				number,
				complement,
			},
			new UniqueEntityID(id),
		)

		await this.addressRepository.save(address)

		return {
			address,
		}
	}
}
