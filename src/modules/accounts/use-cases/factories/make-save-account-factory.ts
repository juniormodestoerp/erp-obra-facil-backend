import { PrismaAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-respository'

import { SaveAccountUseCase } from '@modules/accounts/use-cases/save-account-use-case'

export function makeSaveAccountUseCase() {
	const bankDomainAccountsRepository = new PrismaAccountsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveAccountUseCase(bankDomainAccountsRepository, usersRepository)
}
