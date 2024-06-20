import type {
	Address as RawAddress,
	File as RawFiles,
	Setting as RawSetting,
	User as RawUser,
} from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'

import { PrismaAddressesMapper } from '@modules/addresses/repositories/prisma/mappers/prisma-address-mapper'
import { PrismaSettingsMapper } from '@modules/settings/repositories/prisma/mappers/prisma-settings-mapper'
import { User, type UserRole } from '@modules/users/entities/user'
import { PrismaUserFilesMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-files-mapper'

export class PrismaUserMapper {
	static toPrisma(user: User) {
		return {
			id: user.id.toString(),
			name: user.name,
			document: user.document,
			email: user.email,
			phone: user.phone,
			birthDate: user.birthDate,
			password: user.password,
			role: user.role,
			status: user.status,
			balance: user.balance,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			deletedAt: user.deletedAt,
			addressId: user.address ? user.address.id.toString() : null,
			fileId: user.files.length > 0 ? user.files[0].id.toString() : null,
			profilePicture: user.profilePicture,
		}
	}

	static toDomain(
		raw: RawUser & {
			address?: RawAddress | null
			files?: RawFiles[]
			settings?: RawSetting[]
		},
	): User {
		const address = raw.address
			? PrismaAddressesMapper.toDomain(raw.address)
			: null

		const files = raw.files
			? raw.files.map((file) => PrismaUserFilesMapper.toDomain(file))
			: []

		const settings = raw.settings
			? raw.settings.map((setting) => PrismaSettingsMapper.toDomain(setting))
			: []

		const document = new Document(raw.document, 'CPF')

		const email = new Email(raw.email)

		return User.create(
			{
				name: raw.name,
				document: document.value,
				email: email.value,
				phone: raw.phone,
				birthDate: raw.birthDate,
				password: raw.password,
				balance: raw.balance,
				profilePicture: raw.profilePicture,
				role: raw.role as UserRole,
				status: raw.status,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
				address,
				files,
				settings,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
