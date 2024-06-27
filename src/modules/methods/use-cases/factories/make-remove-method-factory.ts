import { PrismaMethodsRepository } from '@modules/methods/repositories/prisma/repositories/prisma-methods-repository'

import { RemoveMethodUseCase } from '@modules/methods/use-cases/remove-method-use-case'

export function makeRemoveMethodUseCase() {
	const paymentMethodsRepository = new PrismaMethodsRepository()

	return new RemoveMethodUseCase(paymentMethodsRepository)
}
