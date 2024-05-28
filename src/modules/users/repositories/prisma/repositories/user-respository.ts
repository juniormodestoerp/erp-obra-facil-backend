import type { PrismaClient } from '@prisma/client'

import type { IFindManyUsersDTO } from '@modules/users/dtos/find-many-users-dto'
import type { IFindUserByIdDTO } from '@modules/users/dtos/find-user-by-id-dto'
import type { User } from '@modules/users/entities/user'
import { PrismaUserMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

import { PrismaSettingsMapper } from '@modules/settings/repositories/prisma/mappers/prisma-settings-mapper'
import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'

export class PrismaUsersRepository implements UsersRepository {
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById({ userId }: IFindUserByIdDTO): Promise<User | null> {
		const user = await this.repository.user.findFirst({
			where: {
				id: userId,
			},
		})

		if (!user) {
			return null
		}

		return PrismaUserMapper.toDomain(user)
	}

	async findByDocument(document: string): Promise<User | null> {
		const user = await this.repository.user.findUnique({
			where: {
				document,
				deletedAt: null,
			},
		})

		if (!user) {
			return null
		}

		return PrismaUserMapper.toDomain(user)
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.repository.user.findUnique({
			where: {
				email,
				deletedAt: null,
			},
		})

		if (!user) {
			return null
		}

		return PrismaUserMapper.toDomain(user)
	}

	async findByPhone(phone: string): Promise<User | null> {
		const user = await this.repository.user.findUnique({
			where: {
				phone,
				deletedAt: null,
			},
		})

		if (!user) {
			return null
		}

		return PrismaUserMapper.toDomain(user)
	}

	async findMany({ pageIndex, role }: IFindManyUsersDTO): Promise<User[]> {
		const skip = (pageIndex - 1) * env.PER_PAGE

		const users = await this.repository.user.findMany({
			where: {
				role,
				deletedAt: null,
			},
			skip,
			take: env.PER_PAGE,
			orderBy: {
				updatedAt: 'desc',
			},
		})

		if (!users) {
			return []
		}

		return users.map((user) => PrismaUserMapper.toDomain(user))
	}

	async create(user: User): Promise<void> {
		const prismaUserData = PrismaUserMapper.toPrisma(user)

		const prismaSettingsData = user.settings.map((setting) => {
			return PrismaSettingsMapper.toPrisma(setting)
		})

		const userDataWithSettings = {
			...prismaUserData,
			settings: {
				create: [],
			},
		}

		await this.repository.user.create({
			data: userDataWithSettings,
		})

		await this.repository.setting.createMany({
			data: prismaSettingsData,
		})
	}

	async save(user: User): Promise<void> {
		const prismaUserData = PrismaUserMapper.toPrisma(user)

		await this.repository.user.update({
			where: {
				id: user.id.toString(),
			},
			data: prismaUserData,
		})
	}

	async remove({ userId }: IFindUserByIdDTO): Promise<void> {
		await this.repository.user.update({
			where: {
				id: userId,
				deletedAt: null,
			},
			data: {
				deletedAt: new Date(),
			},
		})
	}
}
