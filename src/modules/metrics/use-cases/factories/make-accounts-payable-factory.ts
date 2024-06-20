import { AccountsPayableUseCase } from '@modules/metrics/use-cases/accounts-payable-use-case'

export function makeAccountsPayableUseCase() {
	return new AccountsPayableUseCase()
}
