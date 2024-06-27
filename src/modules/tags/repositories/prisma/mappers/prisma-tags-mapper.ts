import type {
	Tag as RawTag,
	Transaction as RawTransaction,
	User as RawUser,
} from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Tag } from '@modules/tags/entities/tag'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'
import { PrismaUsersMapper } from '@modules/users/repositories/prisma/mappers/prisma-users-mapper'

export class PrismaTagsMapper {
	static toPrisma(tag: Tag): any {
		return {
			id: tag.id.toString(),
			userId: tag.userId,
			name: tag.name,
			createdAt: tag.createdAt,
			updatedAt: tag.updatedAt,
			deletedAt: tag.deletedAt,
			user: tag.user ? { connect: { id: tag.user.id.toString() } } : undefined,
			transactions:
				tag.transactions.length > 0
					? {
							connect: tag.transactions.map((transaction) => ({
								id: transaction.id.toString(),
							})),
						}
					: undefined,
		}
	}

	static toDomain(
		raw: RawTag & {
			user: RawUser
			transactions?: RawTransaction[]
		},
	): Tag {
		const user = raw.user ? PrismaUsersMapper.toDomain(raw.user) : null

		const transactions = raw.transactions
			? raw.transactions.map((transaction: RawTransaction) =>
					PrismaTransactionsMapper.toDomain(transaction),
				)
			: []

		return Tag.create(
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
