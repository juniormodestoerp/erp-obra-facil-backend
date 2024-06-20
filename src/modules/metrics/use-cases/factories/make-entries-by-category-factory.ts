import { EntriesByCategoryUseCase } from '@modules/metrics/use-cases/entries-by-category-use-case'

export function makeEntriesByCategoryUseCase() {
	return new EntriesByCategoryUseCase()
}
