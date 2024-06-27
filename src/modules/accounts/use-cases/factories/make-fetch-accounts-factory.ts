import { PrismaDomainAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-repository'

import { FetchAccountsUseCase } from '@modules/accounts/use-cases/fetch-accounts-use-case'

export function makeFetchAccountsUseCase() {
	const bankDomainAccountsRepository = new PrismaDomainAccountsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchAccountsUseCase(bankDomainAccountsRepository, usersRepository)
}
