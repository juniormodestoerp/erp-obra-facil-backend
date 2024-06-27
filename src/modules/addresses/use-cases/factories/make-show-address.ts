import { PrismaAddressesRepository } from '@modules/addresses/repositories/prisma/repositories/prisma-addresses-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/'

import { ShowAddressUseCase } from '@modules/addresses/use-cases/show-address-use-case'

export function makeShowAddressUseCase() {
	const addressRepository = new PrismaAddressesRepository()
	const usersRepository = new PrismaUsersRepository()

	return new ShowAddressUseCase(addressRepository, usersRepository)
}
