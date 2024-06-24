import { PrismaPaymentMethodsRepository } from '@modules/payment-methods/repositories/prisma/repositories/payment-methods-respository'

import { RemovePaymentMethodUseCase } from '@modules/payment-methods/use-cases/remove-payment-method-use-case'

export function makeRemovePaymentMethodUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()

	return new RemovePaymentMethodUseCase(paymentMethodsRepository)
}
