import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Address } from '@modules/addresses/entities/address'
import { User } from '@modules/users/entities/user'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	name: string
	email: string
	phone: string
	zipCode: string
	state: string
	city: string
	street: string
	neighborhood: string
	number: string
	complement: string
}

interface Output {
	user: User
}

export class SaveUserUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	async execute({
		id,
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
	}: Input): Promise<Output> {
		const previusUser = await this.usersRepository.findProfile({
			userId: id,
		})

		if (!previusUser) {
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
			new UniqueEntityID(id),
		)

		complement = complement ?? 'Não informado'

		const address = Address.create({
			userId: id,
			zipCode,
			state,
			city,
			neighborhood,
			street,
			number,
			complement,
		})

		updatedUser.address = address

		await this.usersRepository.save(updatedUser)

		return {
			user: updatedUser,
		}
	}
}
