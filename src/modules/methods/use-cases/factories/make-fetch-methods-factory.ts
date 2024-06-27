import { PrismaPaymentMethodsRepository } from '@modules/methods/repositories/prisma/repositories/methods-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { FetchPaymentMethodsUseCase } from '@modules/methods/use-cases/fetch-methods-use-case'

export function makeFetchPaymentMethodsUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchPaymentMethodsUseCase(
		paymentMethodsRepository,
		usersRepository,
	)
}
