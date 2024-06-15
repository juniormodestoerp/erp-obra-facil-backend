import type { IFindAddressByIdDTO } from '@modules/addresses/dtos/find-address-by-id-dto'
import type { IFindAddressByUserIdDTO } from '@modules/addresses/dtos/find-address-by-user-id-dto'

import type { Address } from '@modules/addresses/entities/address'

export interface AddressesRepository {
	findById({ id }: IFindAddressByIdDTO): Promise<Address | null>
	findByUserId({ userId }: IFindAddressByUserIdDTO): Promise<Address | null>
	count(): Promise<number>
	save(address: Address): Promise<void>
	remove({ id }: IFindAddressByIdDTO): Promise<void>
}
