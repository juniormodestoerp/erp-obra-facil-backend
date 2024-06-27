import { PrismaPaymentMethodsRepository } from '@modules/methods/repositories/prisma/repositories/methods-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { SavePaymentMethodUseCase } from '@modules/methods/use-cases/save-method-use-case'

export function makeSavePaymentMethodUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SavePaymentMethodUseCase(paymentMethodsRepository, usersRepository)
}
