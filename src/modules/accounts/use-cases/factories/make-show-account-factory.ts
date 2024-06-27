import { PrismaDomainAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-respository'

import { ShowAccountUseCase } from '@modules/accounts/use-cases/show-account-use-case'

export function makeShowAccountUseCase() {
	const bankDomainAccountsRepository = new PrismaDomainAccountsRepository()

	return new ShowAccountUseCase(bankDomainAccountsRepository)
}
