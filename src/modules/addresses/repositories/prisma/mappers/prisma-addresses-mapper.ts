import type { Address as RawAddress, User as RawUser } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Address } from '@modules/addresses/entities/address'
import { PrismaUsersMapper } from '@modules/users/repositories/prisma/mappers/prisma-users-mapper'

export class PrismaAddressesMapper {
	static toPrisma(address: Address) {
		return {
			id: address.id.toString(),
			userId: address.userId,
			zipCode: address.zipCode,
			state: address.state,
			city: address.city,
			neighborhood: address.neighborhood,
			street: address.street,
			number: address.number,
			complement: address.complement,
			createdAt: address.createdAt,
			updatedAt: address.updatedAt,
			deletedAt: address.deletedAt,
		}
	}

	static toDomain(
		raw: RawAddress & {
			user?: RawUser
		},
	): Address {
		const user = raw.user ? PrismaUsersMapper.toDomain(raw.user) : null

		return Address.create(
			{
				userId: raw.userId,
				zipCode: raw.zipCode,
				state: raw.state,
				city: raw.city,
				neighborhood: raw.neighborhood,
				street: raw.street,
				number: raw.number,
				complement: raw.complement,
				createdAt: new Date(raw.createdAt),
				updatedAt: new Date(raw.updatedAt),
				deletedAt: raw.deletedAt ? new Date(raw.deletedAt) : null,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
