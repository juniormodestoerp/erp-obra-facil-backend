import { TotalsByCategoryUseCase } from '@modules/metrics/use-cases/totals-by-category-use-case'

export function makeTotalsByCategoryUseCase() {
	return new TotalsByCategoryUseCase()
}
