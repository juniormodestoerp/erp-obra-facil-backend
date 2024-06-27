import { PrismaMethodsRepository } from '@modules/methods/repositories/prisma/repositories/prisma-methods-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { SaveMethodUseCase } from '@modules/methods/use-cases/save-method-use-case'

export function makeSaveMethodUseCase() {
	const paymentMethodsRepository = new PrismaMethodsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveMethodUseCase(paymentMethodsRepository, usersRepository)
}
