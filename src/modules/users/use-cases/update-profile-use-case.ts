import { writeFile } from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'
import { join, extname } from 'node:path'
import type { MultipartFile } from '@fastify/multipart'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import type { UsersRepository } from '@modules/users/repositories/user-repository'
import type { AddressesRepository } from '@modules/addresses/repositories/address-repository'
import type { UsersFilesRepository } from '@modules/users/repositories/user-files-repository'
import { User } from '@modules/users/entities/user'
import { Address } from '@modules/addresses/entities/address'

interface Input {
	userId: string
	data: MultipartFile
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
		private readonly usersRepository: UsersRepository,
		private readonly addressesRepository: AddressesRepository,
		private readonly userFilesRepository: UsersFilesRepository
	) {}

	async execute({
		userId,
		data,
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
			complement,
		})

		await this.addressesRepository.save(address)

		const uploadsDirectory = join(__dirname, '..', '..', 'uploads', 'profile')

		if (!existsSync(uploadsDirectory)) {
			mkdirSync(uploadsDirectory)
		}

		if (data !== undefined) {
			const fileName = `${name.replace(' ', '-').toLowerCase()}.${userId}.${extname(data.filename)}`
			const filePath = join(uploadsDirectory, fileName)
			await writeFile(filePath, await data.toBuffer())
		}
	}
}
