import type { CostAndProfitCenter as RawCostAndProfitCenter } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { CostAndProfitCenter } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'

export class PrismaCostAndProfitCentersMapper {
	static toPrisma(costAndProfitCenter: CostAndProfitCenter): RawCostAndProfitCenter {
		return {
			id: costAndProfitCenter.id,
			userId: costAndProfitCenter.userId,
			name: costAndProfitCenter.name,
			createdAt: costAndProfitCenter.createdAt,
			updatedAt: costAndProfitCenter.updatedAt,
			deletedAt: costAndProfitCenter.deletedAt,
		}
	}

	static toDomain(raw: RawCostAndProfitCenter): CostAndProfitCenter {
		return CostAndProfitCenter.create(
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
