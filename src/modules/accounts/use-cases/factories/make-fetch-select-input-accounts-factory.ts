import { PrismaDomainAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-respository'

import { FetchSelectInputAccountsUseCase } from '@modules/accounts/use-cases/fetch-select-input-accounts-use-case'

export function makeFetchSelectInputAccountsUseCase() {
	const bankDomainAccountsRepository = new PrismaDomainAccountsRepository()

	return new FetchSelectInputAccountsUseCase(bankDomainAccountsRepository)
}
