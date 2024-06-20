import { TotalsByCenterUseCase } from '@modules/metrics/use-cases/totals-by-center-use-case'

export function makeTotalsByCenterUseCase() {
	return new TotalsByCenterUseCase()
}
