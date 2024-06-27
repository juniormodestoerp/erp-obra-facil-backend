import { PrismaAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-respository'

import { FetchAccountsUseCase } from '@modules/accounts/use-cases/fetch-accounts-use-case'

export function makeFetchAccountsUseCase() {
	const bankDomainAccountsRepository = new PrismaAccountsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchAccountsUseCase(bankDomainAccountsRepository, usersRepository)
}
