import { PrismaDomainAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-respository'

import { RemoveAccountUseCase } from '@modules/accounts/use-cases/remove-account-use-case'

export function makeRemoveAccountUseCase() {
	const bankDomainAccountsRepository = new PrismaDomainAccountsRepository()

	return new RemoveAccountUseCase(bankDomainAccountsRepository)
}
