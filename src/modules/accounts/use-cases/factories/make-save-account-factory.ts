import { PrismaDomainAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { SaveAccountUseCase } from '@modules/accounts/use-cases/save-account-use-case'

export function makeSaveAccountUseCase() {
	const bankDomainAccountsRepository = new PrismaDomainAccountsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveAccountUseCase(bankDomainAccountsRepository, usersRepository)
}
