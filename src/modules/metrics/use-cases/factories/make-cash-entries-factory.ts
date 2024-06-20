import { CashEntriesUseCase } from '@modules/metrics/use-cases/cash-entries-use-case'

export function makeCashEntriesUseCase() {
	return new CashEntriesUseCase()
}
