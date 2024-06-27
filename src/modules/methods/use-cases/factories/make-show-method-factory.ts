import { PrismaMethodsRepository } from '@modules/methods/repositories/prisma/repositories/prisma-methods-repository'

import { ShowMethodUseCase } from '@modules/methods/use-cases/show-method-use-case'

export function makeShowMethodUseCase() {
	const paymentMethodsRepository = new PrismaMethodsRepository()

	return new ShowMethodUseCase(paymentMethodsRepository)
}
