import { PrismaPaymentMethodsRepository } from '@modules/payment-methods/repositories/prisma/repositories/payment-methods-respository'

import { CreatePaymentMethodUseCase } from '@modules/payment-methods/use-cases/create-payment-method-use-case'

export function makeCreatePaymentMethodUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()

	return new CreatePaymentMethodUseCase(paymentMethodsRepository)
}
