import type {
	Center as RawCenter,
	Transaction as RawTransaction,
	User as RawUser,
} from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Center } from '@modules/centers/entities/center'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'
import { PrismaUsersMapper } from '@modules/users/repositories/prisma/mappers/prisma-users-mapper'

export class PrismaCentersMapper {
	static toPrisma(center: Center): RawCenter {
		return {
			id: center.id.toString(),
			userId: center.userId,
			name: center.name,
			createdAt: center.createdAt,
			updatedAt: center.updatedAt,
			deletedAt: center.deletedAt,
			user: center.user
				? { connect: { id: center.user.id.toString() } }
				: undefined,
			transactions:
				center.transactions.length > 0
					? {
							connect: center.transactions.map((transaction) => ({
								id: transaction.id.toString(),
							})),
						}
					: undefined,
		}
	}

	static toDomain(
		raw: RawCenter & {
			user: RawUser
			transactions?: RawTransaction[]
		},
	): Center {
		const user = raw.user ? PrismaUsersMapper.toDomain(raw.user) : null

		const transactions = raw.transactions
			? raw.transactions.map((transaction: RawTransaction) =>
					PrismaTransactionsMapper.toDomain(transaction),
				)
			: []

		return Center.create(
			{
				userId: raw.userId,
				name: raw.name,
				createdAt: new Date(raw.createdAt),
				updatedAt: new Date(raw.updatedAt),
				deletedAt: raw.deletedAt ? new Date(raw.deletedAt) : null,
				user,
				transactions,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
