import { PrismaBankAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/bank-accounts-respository'

import { ShowBankAccountUseCase } from '@modules/accounts/use-cases/show-bank-account-use-case'

export function makeShowBankAccountUseCase() {
	const bankAccountsRepository = new PrismaBankAccountsRepository()

	return new ShowBankAccountUseCase(bankAccountsRepository)
}
