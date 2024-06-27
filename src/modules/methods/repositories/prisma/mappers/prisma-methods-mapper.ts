import type {
	Method as RawMethod,
	Transaction as RawTransaction,
	User as RawUser,
} from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Method } from '@modules/methods/entities/method'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'
import { PrismaUsersMapper } from '@modules/users/repositories/prisma/mappers/prisma-users-mapper'

export class PrismaMethodsMapper {
	static toPrisma(method: Method): any {
		return {
			id: method.id.toString(),
			userId: method.userId,
			name: method.name,
			createdAt: method.createdAt,
			updatedAt: method.updatedAt,
			deletedAt: method.deletedAt,
			user: method.user
				? { connect: { id: method.user.id.toString() } }
				: undefined,
			transactions:
				method.transactions.length > 0
					? {
							connect: method.transactions.map((transaction) => ({
								id: transaction.id.toString(),
							})),
						}
					: undefined,
		}
	}

	static toDomain(
		raw: RawMethod & {
			user: RawUser
			transactions?: RawTransaction[]
		},
	): Method {
		const user = raw.user ? PrismaUsersMapper.toDomain(raw.user) : null

		const transactions = raw.transactions
			? raw.transactions.map((transaction: RawTransaction) =>
					PrismaTransactionsMapper.toDomain(transaction),
				)
			: []

		return Method.create(
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
