import { PrismaAddressesRepository } from '@modules/addresses/repositories/prisma/repositories/address-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-repository'

import { ShowAddressUseCase } from '@modules/addresses/use-cases/show-address-use-case'

export function makeShowAddressUseCase() {
	const addressRepository = new PrismaAddressesRepository()
	const usersRepository = new PrismaUsersRepository()

	return new ShowAddressUseCase(addressRepository, usersRepository)
}
