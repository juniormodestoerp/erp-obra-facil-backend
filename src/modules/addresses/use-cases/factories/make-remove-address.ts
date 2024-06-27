import { PrismaAddressesRepository } from '@modules/addresses/repositories/prisma/repositories/address-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-repository'

import { RemoveAddressUseCase } from '@modules/addresses/use-cases/remove-address-use-case'

export function makeRemoveAddressUseCase() {
	const addressRepository = new PrismaAddressesRepository()
	const usersRepository = new PrismaUsersRepository()

	return new RemoveAddressUseCase(addressRepository, usersRepository)
}
