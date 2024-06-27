import { PrismaPaymentMethodsRepository } from '@modules/payment-methods/repositories/prisma/repositories/payment-methods-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { FetchPaymentMethodsUseCase } from '@modules/payment-methods/use-cases/fetch-payment-methods-use-case'

export function makeFetchPaymentMethodsUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchPaymentMethodsUseCase(
		paymentMethodsRepository,
		usersRepository,
	)
}
