/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Setting as RawSetting, User as RawUser } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'

import { PrismaSettingsMapper } from '@modules/settings/repositories/prisma/mappers/prisma-settings-mapper'
import { User, type UserRole } from '@modules/users/entities/user'

type RawUserWithSettings = RawUser & {
	settings?: RawSetting[]
}

export class PrismaUserMapper {
	static toPrisma(user: User): RawUser & { settings?: any } {
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
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			deletedAt: user.deletedAt,
			settings: user.settings
				? {
						create: user.settings.map((setting) =>
							PrismaSettingsMapper.toPrisma(setting),
						),
					}
				: undefined,
		}
	}

	static toDomain(raw: RawUserWithSettings): User {
		const settings = raw.settings
			? raw.settings.map(PrismaSettingsMapper.toDomain)
			: []
		return User.create(
			{
				name: raw.name,
				document: new Document(raw.document, 'CPF').value,
				email: new Email(raw.email).value,
				phone: raw.phone,
				birthDate: raw.birthDate,
				password: raw.password,
				role: raw.role as UserRole,
				status: raw.status,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt ?? null,
				settings,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
