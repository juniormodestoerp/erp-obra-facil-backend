import { readFileSync } from 'node:fs'
import type { PrismaClient, User as RawUser } from '@prisma/client'

import { PrismaSettingsMapper } from '@modules/settings/repositories/prisma/mappers/prisma-settings-mapper'
import type { IFindManyUsersDTO } from '@modules/users/dtos/find-many-users-dto'
import type { IFindUserByIdDTO } from '@modules/users/dtos/find-user-by-id-dto'
import type { User } from '@modules/users/entities/user'
import { PrismaUserMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'
import { PrismaUserFilesMapper } from '../mappers/prisma-user-files-mapper'

export class PrismaUsersRepository implements UsersRepository {
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById({ userId }: IFindUserByIdDTO): Promise<User | null> {
		const user = await this.repository.user.findUnique({
			where: {
				id: userId,
			},
		})

		if (!user) {
			return null
		}

		return PrismaUserMapper.toDomain(user)
	}

	async findProfile({ userId }: IFindUserByIdDTO): Promise<User | null> {
		const user = await this.repository.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				address: true,
				files: {
					where: {
						path: {
							startsWith: '/src/uploads/profile-pictures',
						},
						contentType: {
							startsWith: 'image/',
						},
					},
					orderBy: {
						updatedAt: 'desc',
					},
					take: 1,
				},
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

		return PrismaUserMapper.toDomain(user as any)
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

		return users.map((user) => PrismaUserMapper.toDomain(user as any))
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
		const prismaAddressData = {
			userId: user.id,
			zipCode: user?.address?.zipCode ?? '',
			state: user?.address?.state ?? '',
			city: user?.address?.city ?? '',
			neighborhood: user?.address?.neighborhood ?? '',
			street: user?.address?.street ?? '',
			number: user?.address?.number ?? '',
			complement: user?.address?.complement ?? 'Não informado',
		}

		await this.repository.user.update({
			where: {
				id: user.id,
			},
			data: prismaUserData,
		})

		const address = await this.repository.address.upsert({
			where: {
				userId: prismaAddressData.userId,
			},
			create: prismaAddressData,
			update: prismaAddressData,
		})

		await this.repository.user.update({
			where: { id: user.id },
			data: { addressId: address.id },
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
