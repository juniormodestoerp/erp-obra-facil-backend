import { CashFlowUseCase } from '@modules/metrics/use-cases/cash-flow-use-case'

export function makeCashFlowUseCase() {
	return new CashFlowUseCase()
}
