import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'
import { PrismaAddressesRepository } from '@modules/addresses/repositories/prisma/repositories/address-respository'
import { PrismaUserFilesRepository } from '@modules/users/repositories/prisma/repositories/user-files-respository'

import { UpdateProfileUseCase } from '@modules/users/use-cases/update-profile-use-case'

export function makeUpdateProfileUseCase() {
	const usersRepository = new PrismaUsersRepository()
	const addressesRepository = new PrismaAddressesRepository()
	const userFilesRepository = new PrismaUserFilesRepository()

	return new UpdateProfileUseCase(
		usersRepository,
		addressesRepository,
		userFilesRepository,
	)
}
