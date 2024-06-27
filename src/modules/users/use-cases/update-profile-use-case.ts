import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Address } from '@modules/addresses/entities/address'
import type { DomainAddressesRepository } from '@modules/addresses/repositories/domain-addresses-repository'
import { User } from '@modules/users/entities/user'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	userId: string
	name: string
	email: string
	phone: string
	zipCode: string
	state: string
	city: string
	neighborhood: string
	street: string
	number: string
	complement?: string
}

export class UpdateProfileUseCase {
	constructor(
		private readonly usersRepository: DomainUsersRepository,
		private readonly addressesRepository: DomainAddressesRepository,
	) {}

	async execute({
		userId,
		name,
		email,
		phone,
		zipCode,
		state,
		city,
		neighborhood,
		street,
		number,
		complement,
	}: Input): Promise<void> {
		const previusUser = await this.usersRepository.findById({ userId })

		if (!previusUser || previusUser.deletedAt === null) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const updatedUser = User.create(
			{
				name: name ?? previusUser.name,
				document: previusUser.document,
				email: email ?? previusUser.email,
				phone: phone ?? previusUser.phone,
				balance: previusUser.balance,
				profilePicture: previusUser.profilePicture,
				password: previusUser.password,
				birthDate: previusUser.birthDate,
				role: previusUser.role,
				status: previusUser.status,
			},
			new UniqueEntityID(userId),
		)

		await this.usersRepository.save(updatedUser)

		const address = Address.create({
			userId,
			zipCode,
			state,
			city,
			neighborhood,
			street,
			number,
			complement: complement ?? 'Não informado',
		})

		await this.addressesRepository.save(address)
	}
}
