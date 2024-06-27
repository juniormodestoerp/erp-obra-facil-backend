import { PrismaAddressesRepository } from '@modules/addresses/repositories/prisma/repositories/prisma-addresses-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { RemoveAddressUseCase } from '@modules/addresses/use-cases/remove-address-use-case'

export function makeRemoveAddressUseCase() {
	const addressRepository = new PrismaAddressesRepository()
	const usersRepository = new PrismaUsersRepository()

	return new RemoveAddressUseCase(addressRepository, usersRepository)
}
