import { PrismaAddressesRepository } from '@modules/addresses/repositories/prisma/repositories/address-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-repository'

import { SaveAddressUseCase } from '@modules/addresses/use-cases/save-address-use-case'

export function makeSaveAddressUseCase() {
	const addressRepository = new PrismaAddressesRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveAddressUseCase(addressRepository, usersRepository)
}
