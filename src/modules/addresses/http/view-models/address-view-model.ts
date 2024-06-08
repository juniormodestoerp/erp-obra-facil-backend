import type { Address } from '@modules/addresses/entities/address'

export class AddressViewModel {
	static toHTTP(address: Address) {
		return {
			id: address.id,
			userId: address.userId,
			zipCode: address.zipCode,
			state: address.state,
			city: address.city,
			neighborhood: address.neighborhood,
			street: address.street,
			number: address.number,
			complement: address.complement,
			createdAt: address.createdAt,
		}
	}
}
