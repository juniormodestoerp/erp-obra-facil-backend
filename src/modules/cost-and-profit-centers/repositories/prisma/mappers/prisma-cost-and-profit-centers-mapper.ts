import type { Center as RawCostAndProfitCenter } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Center } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'

export class PrismaCentersMapper {
	static toPrisma(center: Center): RawCostAndProfitCenter {
		return {
			id: center.id,
			userId: center.userId,
			name: center.name,
			createdAt: center.createdAt,
			updatedAt: center.updatedAt,
			deletedAt: center.deletedAt,
		}
	}

	static toDomain(raw: RawCostAndProfitCenter): Center {
		return Center.create(
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
