import { PrismaAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-repository'

import { ShowAccountUseCase } from '@modules/accounts/use-cases/show-account-use-case'

export function makeShowAccountUseCase() {
	const bankDomainAccountsRepository = new PrismaAccountsRepository()

	return new ShowAccountUseCase(bankDomainAccountsRepository)
}
