import { PrismaBankAccountsRepository } from '@modules/bank-accounts/repositories/prisma/repositories/bank-accounts-respository'

import { CreateBankAccountUseCase } from '@modules/bank-accounts/use-cases/create-bank-account-use-case'

export function makeCreateBankAccountUseCase() {
	const bankAccountsRepository = new PrismaBankAccountsRepository()

	return new CreateBankAccountUseCase(bankAccountsRepository)
}
