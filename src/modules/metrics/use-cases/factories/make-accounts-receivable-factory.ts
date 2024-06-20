import { AccountsReceivableUseCase } from '@modules/metrics/use-cases/accounts-receivable-use-case'

export function makeAccountsReceivableUseCase() {
	return new AccountsReceivableUseCase()
}
