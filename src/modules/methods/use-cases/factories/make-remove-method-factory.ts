import { PrismaPaymentMethodsRepository } from '@modules/methods/repositories/prisma/repositories/methods-respository'

import { RemovePaymentMethodUseCase } from '@modules/methods/use-cases/remove-method-use-case'

export function makeRemovePaymentMethodUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()

	return new RemovePaymentMethodUseCase(paymentMethodsRepository)
}
