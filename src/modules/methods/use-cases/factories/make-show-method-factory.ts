import { PrismaPaymentMethodsRepository } from '@modules/methods/repositories/prisma/repositories/methods-respository'

import { ShowPaymentMethodUseCase } from '@modules/methods/use-cases/show-method-use-case'

export function makeShowPaymentMethodUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()

	return new ShowPaymentMethodUseCase(paymentMethodsRepository)
}
