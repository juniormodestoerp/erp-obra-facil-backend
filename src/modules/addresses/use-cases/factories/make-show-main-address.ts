import { PrismaAddressesRepository } from '@modules/addresses/repositories/prisma/repositories/address-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { ShowMainAddressUseCase } from '@modules/addresses/use-cases/show-main-address-use-case'

export function makeShowMainAddressUseCase() {
	const addressRepository = new PrismaAddressesRepository()
	const usersRepository = new PrismaUsersRepository()

	return new ShowMainAddressUseCase(addressRepository, usersRepository)
}
