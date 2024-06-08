import type { IFindAddressByIdDTO } from '@modules/addresses/dtos/find-address-by-id-dto'
import type { IFindMainAddressDTO } from '@modules/addresses/dtos/find-main-address-dto'

import type { Address } from '@modules/addresses/entities/address'

export interface AddressesRepository {
	findById({ id }: IFindAddressByIdDTO): Promise<Address | null>
	findMainAddress({ userId }: IFindMainAddressDTO): Promise<Address | null>
	count(): Promise<number>
	save(address: Address): Promise<void>
	remove({ id }: IFindAddressByIdDTO): Promise<void>
}
