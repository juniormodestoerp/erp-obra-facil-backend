import { PrismaMethodsRepository } from '@modules/methods/repositories/prisma/repositories/prisma-methods-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { FetchMethodsUseCase } from '@modules/methods/use-cases/fetch-methods-use-case'

export function makeFetchMethodsUseCase() {
	const paymentMethodsRepository = new PrismaMethodsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchMethodsUseCase(paymentMethodsRepository, usersRepository)
}
