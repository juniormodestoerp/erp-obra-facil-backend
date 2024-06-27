import { PrismaMethodsRepository } from '@modules/methods/repositories/prisma/repositories/prisma-methods-repository'

import { FetchSelectInputMethodsUseCase } from '@modules/methods/use-cases/fetch-select-input-methods-use-case'

export function makeFetchSelectInputMethodsUseCase() {
	const paymentMethodsRepository = new PrismaMethodsRepository()

	return new FetchSelectInputMethodsUseCase(paymentMethodsRepository)
}
