import type { PrismaClient } from '@prisma/client'

import { PrismaSettingsMapper } from '@modules/settings/repositories/prisma/mappers/prisma-settings-mapper'
import type { IFindManyUsersDTO } from '@modules/users/dtos/find-many-users-dto'
import type { IFindUserByIdDTO } from '@modules/users/dtos/find-user-by-id-dto'
import type { User } from '@modules/users/entities/user'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'
import { PrismaUsersMapper } from '@modules/users/repositories/prisma/mappers/prisma-users-mapper'

import { PrismaAddressesMapper } from '@modules/addresses/repositories/prisma/mappers/prisma-addresses-mapper'
import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'

export class PrismaUsersRepository implements DomainUsersRepository {
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

		return PrismaUsersMapper.toDomain(user)
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

		const address = await this.repository.address.findUnique({
			where: {
				userId,
			},
		})

		if (!user) {
			return null
		}

		user.address = address

		return PrismaUsersMapper.toDomain(user)
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

		return PrismaUsersMapper.toDomain(user)
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

		return PrismaUsersMapper.toDomain(user)
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

		return PrismaUsersMapper.toDomain(user as any)
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

		return users.map((user) => PrismaUsersMapper.toDomain(user as any))
	}

	async create(user: User): Promise<void> {
		const prismaUserData = PrismaUsersMapper.toPrisma(user)

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
		const prismaUserData = PrismaUsersMapper.toPrisma(user)

		// Mapeando os dados do endereço, se existir
		const prismaAddressData = user.address
			? PrismaAddressesMapper.toPrisma(user.address)
			: null

		await this.repository.$transaction(async (prisma) => {
			const previusAddress = await prisma.address.findUnique({
				where: {
					userId: user.id,
				},
			})

			if (previusAddress === null && prismaAddressData !== null) {
				await prisma.address.create({
					data: prismaAddressData,
				})
			}

			if (previusAddress && prismaAddressData !== null) {
				await prisma.address.update({
					where: { id: previusAddress.id },
					data: prismaAddressData,
				})
			}

			await prisma.user.update({
				where: { id: user.id },
				data: prismaUserData,
			})
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
