import { PrismaAddressesRepository } from '@modules/addresses/repositories/prisma/repositories/address-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { UpdateProfileUseCase } from '@modules/users/use-cases/update-profile-use-case'

export function makeUpdateProfileUseCase() {
	const usersRepository = new PrismaUsersRepository()
	const addressesRepository = new PrismaAddressesRepository()

	return new UpdateProfileUseCase(usersRepository, addressesRepository)
}
