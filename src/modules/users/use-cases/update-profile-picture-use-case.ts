import { existsSync, mkdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

import type { MultipartFile } from '@fastify/multipart'

import { AppError } from '@core/domain/errors/app-error'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { File } from '@modules/users/entities/file'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'
import type { DomainUsersFilesRepository } from '@modules/users/repositories/prisma-user-files-repository'

interface Input {
	userId: string
	data: MultipartFile
}

interface Output {
	profilePicture: string
}

export class UpdateProfilePictureUseCase {
	constructor(
		private readonly usersRepository: DomainUsersRepository,
		private readonly userFilesRepository: DomainUsersFilesRepository,
	) {}

	async execute({ userId, data }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({ userId })

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const uploadsDirectory = join(
			__dirname,
			'..',
			'..',
			'..',
			'..',
			'src',
			'uploads',
			'profile-pictures',
		)

		if (!existsSync(uploadsDirectory)) {
			mkdirSync(uploadsDirectory, { recursive: true })
		}

		const fileName = `${user.name.replace(' ', '-').toLowerCase()}-${userId}${extname(data.filename)}`
		const filePath = join(uploadsDirectory, fileName)

		try {
			await writeFile(filePath, await data.toBuffer())
			if (!existsSync(filePath)) {
				throw new Error(`File does not exist after writing: ${filePath}`)
			}
		} catch (error) {
			console.error('Error writing file:', error)
		}

		const previusFile = await this.userFilesRepository.findById({ userId })

		function getRelativePath(fullPath: string) {
			const srcIndex = fullPath.indexOf('/src')
			if (srcIndex === -1) {
				throw new Error('O caminho não contém "/src"')
			}
			return fullPath.substring(srcIndex)
		}

		const profilePicture = File.create(
			{
				userId,
				path: getRelativePath(filePath),
				name: fileName,
				contentType: data.mimetype,
				user: null,
			},
			new UniqueEntityID(previusFile?.id),
		)

		await this.userFilesRepository.save(profilePicture)

		user.profilePicture = getRelativePath(filePath)
		await this.usersRepository.save(user)

		return {
			profilePicture: profilePicture.path,
		}
	}
}
