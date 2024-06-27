import { PrismaAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-repository'

import { RemoveAccountUseCase } from '@modules/accounts/use-cases/remove-account-use-case'

export function makeRemoveAccountUseCase() {
	const bankDomainAccountsRepository = new PrismaAccountsRepository()

	return new RemoveAccountUseCase(bankDomainAccountsRepository)
}
