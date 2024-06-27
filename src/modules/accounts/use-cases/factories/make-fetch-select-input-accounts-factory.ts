import { PrismaAccountsRepository } from '@modules/accounts/repositories/prisma/repositories/prisma-accounts-repository'
import { FetchSelectInputAccountsUseCase } from '@modules/accounts/use-cases/fetch-select-input-accounts-use-case'

export function makeFetchSelectInputAccountsUseCase() {
	const bankDomainAccountsRepository = new PrismaAccountsRepository()

	return new FetchSelectInputAccountsUseCase(bankDomainAccountsRepository)
}
