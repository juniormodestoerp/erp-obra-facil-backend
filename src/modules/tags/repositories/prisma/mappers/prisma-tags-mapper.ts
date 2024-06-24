import type { Tag as RawTag } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Tag } from '@modules/tags/entities/tag'

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
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
