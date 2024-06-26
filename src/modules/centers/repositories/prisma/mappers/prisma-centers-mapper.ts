import type { Center as RawCenter } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Center } from '@modules/centers/entities/center'

export class PrismaCentersMapper {
	static toPrisma(center: Center): RawCenter {
		return {
			id: center.id,
			userId: center.userId,
			name: center.name,
			createdAt: center.createdAt,
			updatedAt: center.updatedAt,
			deletedAt: center.deletedAt,
		}
	}

	static toDomain(raw: RawCenter): Center {
		return Center.create(
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
