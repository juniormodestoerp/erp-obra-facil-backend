import { PrismaPaymentMethodsRepository } from '@modules/payment-methods/repositories/prisma/repositories/payment-methods-respository'

import { FetchSelectInputPaymentMethodsUseCase } from '@modules/payment-methods/use-cases/fetch-select-input-payment-methods-use-case'

export function makeFetchSelectInputPaymentMethodsUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()

	return new FetchSelectInputPaymentMethodsUseCase(paymentMethodsRepository)
}
