import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Address } from '@modules/addresses/entities/address'
import type { AddressesRepository } from '@modules/addresses/repositories/address-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	userId: string
	zipCode: string
	state: string
	city: string
	neighborhood: string
	street: string
	number: string
	complement: string | null
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
				complement: complement ?? 'Não informado',
			},
			new UniqueEntityID(id),
		)

		await this.addressRepository.save(address)

		return {
			address,
		}
	}
}
