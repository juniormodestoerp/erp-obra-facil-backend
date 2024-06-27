import { PrismaBankAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/bank-accounts-respository'

import { FetchSelectInputBankAccountsUseCase } from '@modules/accounts/use-cases/fetch-select-input-bank-accounts-use-case'

export function makeFetchSelectInputBankAccountsUseCase() {
	const bankAccountsRepository = new PrismaBankAccountsRepository()

	return new FetchSelectInputBankAccountsUseCase(bankAccountsRepository)
}
