import type { UserToken as RawUserToken } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { UserToken } from '@modules/users/entities/user-token'

export class PrismaUserTokenMapper {
	static toPrisma(user: UserToken) {
		return {
			id: user.id,
			userId: user.userId,
			token: user.token,
			code: user.code,
			usage: user.usage,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			deletedAt: user.deletedAt,
		}
	}

	static toDomain(raw: RawUserToken): UserToken {
		return UserToken.create(
			{
				userId: raw.userId,
				token: raw.token,
				code: raw.code,
				usage: raw.usage,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
