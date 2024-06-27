import { PrismaPaymentMethodsRepository } from '@modules/methods/repositories/prisma/repositories/methods-respository'

import { FetchSelectInputPaymentMethodsUseCase } from '@modules/methods/use-cases/fetch-select-input-methods-use-case'

export function makeFetchSelectInputPaymentMethodsUseCase() {
	const paymentMethodsRepository = new PrismaPaymentMethodsRepository()

	return new FetchSelectInputPaymentMethodsUseCase(paymentMethodsRepository)
}
