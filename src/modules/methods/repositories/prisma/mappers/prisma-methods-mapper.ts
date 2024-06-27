import type { Method as RawMethod } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Method } from '@modules/methods/entities/method'

export class PrismaMethodsMapper {
	static toPrisma(method: Method): RawMethod {
		return {
			id: method.id,
			userId: method.userId,
			name: method.name,
			createdAt: method.createdAt,
			updatedAt: method.updatedAt,
			deletedAt: method.deletedAt,
		}
	}

	static toDomain(raw: RawMethod): Method {
		return Method.create(
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
