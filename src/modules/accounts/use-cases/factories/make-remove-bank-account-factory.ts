import { PrismaBankAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/bank-accounts-respository'

import { RemoveBankAccountUseCase } from '@modules/accounts/use-cases/remove-bank-account-use-case'

export function makeRemoveBankAccountUseCase() {
	const bankAccountsRepository = new PrismaBankAccountsRepository()

	return new RemoveBankAccountUseCase(bankAccountsRepository)
}
