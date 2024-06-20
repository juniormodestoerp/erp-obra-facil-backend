import { TotalsByProjectUseCase } from '@modules/metrics/use-cases/totals-by-project-use-case'

export function makeTotalsByProjectUseCase() {
	return new TotalsByProjectUseCase()
}
