import { PrismaBankAccountsRepository } from '@modules/bank-accounts/repositories/prisma/repositories/bank-accounts-respository'

import { RemoveBankAccountUseCase } from '@modules/bank-accounts/use-cases/remove-bank-account-use-case'

export function makeRemoveBankAccountUseCase() {
	const bankAccountsRepository = new PrismaBankAccountsRepository()

	return new RemoveBankAccountUseCase(bankAccountsRepository)
}
