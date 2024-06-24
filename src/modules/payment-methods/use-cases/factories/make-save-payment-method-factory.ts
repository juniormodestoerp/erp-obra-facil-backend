import { PrismaPaymentMethodsRepository } from '@modules/payment-methods/repositories/prisma/repositories/payment-methods-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { SavePaymentMethodUseCase } from '@modules/payment-methods/use-cases/save-payment-method-use-case'

export function makeSavePaymentMethodUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SavePaymentMethodUseCase(paymentMethodsRepository, usersRepository)
}
