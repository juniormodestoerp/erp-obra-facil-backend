import type { Transfer as RawTransfer } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Transfer } from '@modules/transfers/entities/transfer'

export class PrismaTransfersMapper {
	static toPrisma(transfer: Transfer): RawTransfer {
		return {
			id: transfer.id,
			name: transfer.name,
			createdAt: transfer.createdAt,
			updatedAt: transfer.updatedAt,
			deletedAt: transfer.deletedAt,
		}
	}

	static toDomain(raw: RawTransfer): Transfer {
		return Transfer.create(
			{
				name: raw.name,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
				transferOption: [],
			},
			new UniqueEntityID(raw.id),
		)
	}
}
