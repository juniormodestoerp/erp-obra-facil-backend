import { PrismaAddressesRepository } from '@modules/addresses/repositories/prisma/repositories/prisma-addresses-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { UpdateProfileUseCase } from '@modules/users/use-cases/update-profile-use-case'

export function makeUpdateProfileUseCase() {
	const usersRepository = new PrismaUsersRepository()
	const addressesRepository = new PrismaAddressesRepository()

	return new UpdateProfileUseCase(usersRepository, addressesRepository)
}
