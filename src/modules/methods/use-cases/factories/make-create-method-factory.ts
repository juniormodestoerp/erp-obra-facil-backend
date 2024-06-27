import { PrismaPaymentMethodsRepository } from '@modules/methods/repositories/prisma/repositories/methods-respository'

import { CreatePaymentMethodUseCase } from '@modules/methods/use-cases/create-method-use-case'

export function makeCreatePaymentMethodUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()

	return new CreatePaymentMethodUseCase(paymentMethodsRepository)
}
