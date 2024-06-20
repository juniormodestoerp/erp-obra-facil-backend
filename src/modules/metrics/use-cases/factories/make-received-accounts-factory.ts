import { ReceivedAccountsUseCase } from '@modules/metrics/use-cases/received-accounts-use-case'

export function makeReceivedAccountsUseCase() {
	return new ReceivedAccountsUseCase()
}
