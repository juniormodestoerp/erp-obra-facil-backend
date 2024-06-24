import { PrismaBankAccountsRepository } from '@modules/bank-accounts/repositories/prisma/repositories/bank-accounts-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { FetchBankAccountsUseCase } from '@modules/bank-accounts/use-cases/fetch-bank-accounts-use-case'

export function makeFetchBankAccountsUseCase() {
	const bankAccountsRepository = new PrismaBankAccountsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchBankAccountsUseCase(bankAccountsRepository, usersRepository)
}
