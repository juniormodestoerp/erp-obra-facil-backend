// import { createWriteStream, existsSync, mkdirSync } from 'node:fs'
// import { join } from 'node:path'
// import { pipeline } from 'node:stream'
// import util from 'node:util'

import type { MultipartFile } from '@fastify/multipart'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'
// import { Utils } from '@core/utils/string'

import type { UsersRepository } from '@modules/users/repositories/user-repository'
import { Address } from '@modules/addresses/entities/address'
// import { File } from '@modules/users/entities/file'
import { User } from '@modules/users/entities/user'

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
	complement?: string
	profilePicture?: MultipartFile
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
		profilePicture,
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
				password: previusUser.password,
				birthDate: previusUser.birthDate,
				role: previusUser.role,
				status: previusUser.status,
			},
			new UniqueEntityID(id),
		)

		// if (profilePicture) {
		// 	const UPLOAD_DIR = join(__dirname, '../../../../src/uploads')

		// 	if (!existsSync(UPLOAD_DIR)) {
		// 		mkdirSync(UPLOAD_DIR, {
		// 			recursive: true,
		// 		})
		// 	}

		// 	const pictureProfileName = `${Utils.NormalizeName(name)}-${id}-${profilePicture.filename}`
		// 	const pictureProfilePath = join(UPLOAD_DIR, pictureProfileName)

		// 	const pump = util.promisify(pipeline)

		// 	await pump(profilePicture.file, createWriteStream(pictureProfilePath))

		// 	const newProfilePicture = File.create({
		// 		userId: id,
		// 		name: pictureProfileName,
		// 		path: pictureProfilePath,
		// 		contentType: profilePicture.mimetype,
		// 	})

		// 	updatedUser.profilePicture = newProfilePicture
		// }

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
