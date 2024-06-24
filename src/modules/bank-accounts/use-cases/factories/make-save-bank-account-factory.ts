import { PrismaBankAccountsRepository } from '@modules/bank-accounts/repositories/prisma/repositories/bank-accounts-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { SaveBankAccountUseCase } from '@modules/bank-accounts/use-cases/save-bank-account-use-case'

export function makeSaveBankAccountUseCase() {
	const bankAccountsRepository = new PrismaBankAccountsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveBankAccountUseCase(bankAccountsRepository, usersRepository)
}
