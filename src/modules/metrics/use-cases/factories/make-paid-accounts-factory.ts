import { PaidAccountsUseCase } from '@modules/metrics/use-cases/paid-accounts-use-case'

export function makePaidAccountsUseCase() {
	return new PaidAccountsUseCase()
}
