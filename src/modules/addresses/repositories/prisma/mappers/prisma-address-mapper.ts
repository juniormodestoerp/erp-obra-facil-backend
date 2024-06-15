import type { Address as RawAddress } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { Address } from '@modules/addresses/entities/address'

export class PrismaAddressesMapper {
	static toPrisma(address: Address) {
		return {
			userId: address.userId,
			zipCode: address.zipCode,
			state: address.state,
			city: address.city,
			neighborhood: address.neighborhood,
			street: address.street,
			number: address.number,
			complement: address.complement ?? null,
			createdAt: address.createdAt,
			updatedAt: address.updatedAt,
			deletedAt: address.deletedAt ?? null,
		}
	}

	static toDomain(raw: RawAddress): Address {
		return Address.create(
			{
				userId: raw.userId,
				zipCode: raw.zipCode,
				state: raw.state,
				city: raw.city,
				neighborhood: raw.neighborhood,
				street: raw.street,
				number: raw.number,
				complement: raw.complement ?? null,
				createdAt: raw.createdAt,
				updatedAt: raw.createdAt,
				deletedAt: raw.createdAt ?? null,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
