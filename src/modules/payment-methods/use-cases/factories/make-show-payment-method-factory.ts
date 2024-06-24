import { PrismaPaymentMethodsRepository } from '@modules/payment-methods/repositories/prisma/repositories/payment-methods-respository'

import { ShowPaymentMethodUseCase } from '@modules/payment-methods/use-cases/show-payment-method-use-case'

export function makeShowPaymentMethodUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()

	return new ShowPaymentMethodUseCase(paymentMethodsRepository)
}
