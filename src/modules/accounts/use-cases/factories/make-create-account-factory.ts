import { PrismaAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-repository'

import { CreateAccountUseCase } from '@modules/accounts/use-cases/create-account-use-case'

export function makeCreateAccountUseCase() {
	const bankDomainAccountsRepository = new PrismaAccountsRepository()

	return new CreateAccountUseCase(bankDomainAccountsRepository)
}
