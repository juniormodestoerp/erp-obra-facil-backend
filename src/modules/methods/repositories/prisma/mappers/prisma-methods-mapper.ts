import type { Method as RawMethod } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Method } from '@modules/methods/entities/method'

export class PrismaMethodsMapper {
	static toPrisma(method: Method): RawMethod {
		return {
			id: method.id.toString(),
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
				createdAt: new Date(raw.createdAt),
				updatedAt: new Date(raw.updatedAt),
				deletedAt: raw.deletedAt ? new Date(raw.deletedAt) : null,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
