import { PrismaBankAccountsRepository } from '@modules/bank-accounts/repositories/prisma/repositories/bank-accounts-respository'

import { ShowBankAccountUseCase } from '@modules/bank-accounts/use-cases/show-bank-account-use-case'

export function makeShowBankAccountUseCase() {
	const bankAccountsRepository = new PrismaBankAccountsRepository()

	return new ShowBankAccountUseCase(bankAccountsRepository)
}
