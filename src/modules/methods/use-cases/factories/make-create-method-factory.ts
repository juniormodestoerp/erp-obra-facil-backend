import { PrismaMethodsRepository } from '@modules/methods/repositories/prisma/repositories/prisma-methods-repository'

import { CreateMethodUseCase } from '@modules/methods/use-cases/create-method-use-case'

export function makeCreateMethodUseCase() {
	const paymentMethodsRepository = new PrismaMethodsRepository()

	return new CreateMethodUseCase(paymentMethodsRepository)
}
