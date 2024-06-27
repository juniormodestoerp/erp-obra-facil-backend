import { PrismaBankAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/bank-accounts-respository'

import { CreateBankAccountUseCase } from '@modules/accounts/use-cases/create-bank-account-use-case'

export function makeCreateBankAccountUseCase() {
	const bankAccountsRepository = new PrismaBankAccountsRepository()

	return new CreateBankAccountUseCase(bankAccountsRepository)
}
