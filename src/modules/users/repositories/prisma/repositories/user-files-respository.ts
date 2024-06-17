import type { PrismaClient } from '@prisma/client'

import type { IFindFileByUserIdDTO } from '@modules/users/dtos/find-file-by-user-id-dto'
import type { File } from '@modules/users/entities/file'
import { PrismaUserFilesMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-files-mapper'
import type { UsersFilesRepository } from '@modules/users/repositories/user-files-repository'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaUserFilesRepository implements UsersFilesRepository {
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById({ userId }: IFindFileByUserIdDTO): Promise<File | null> {
		const file = await this.repository.file.findUnique({
			where: {
				userId,
			},
		})

		if (!file) {
			return null
		}

		return PrismaUserFilesMapper.toDomain(file)
	}

	async save(file: File): Promise<void> {
		const prismaUserData = PrismaUserFilesMapper.toPrisma(file)

		await this.repository.file.upsert({
			where: {
				id: file.id.toString(),
			},
			create: prismaUserData,
			update: prismaUserData,
		})
	}

	async remove({ userId }: IFindFileByUserIdDTO): Promise<void> {
		await this.repository.file.update({
			where: {
				userId,
				deletedAt: null,
			},
			data: {
				deletedAt: new Date(),
			},
		})
	}
}
