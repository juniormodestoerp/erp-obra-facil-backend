import type { Tag as RawTag } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Tag } from '@modules/tags/entities/tag'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'
import { PrismaUsersMapper } from '@modules/users/repositories/prisma/mappers/prisma-users-mapper'

export class PrismaTagsMapper {
	static toPrisma(tag: Tag): RawTag {
		return {
			id: tag.id,
			userId: tag.userId,
			name: tag.name,
			createdAt: tag.createdAt,
			updatedAt: tag.updatedAt,
			deletedAt: tag.deletedAt,
		}
	}

	static toDomain(raw: RawTag): Tag {
		return Tag.create(
			{
				userId: raw.userId,
				name: raw.name,
				createdAt: new Date(raw.createdAt),
				updatedAt: new Date(raw.updatedAt),
				deletedAt: raw.deletedAt ? new Date(raw.deletedAt) : null,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
