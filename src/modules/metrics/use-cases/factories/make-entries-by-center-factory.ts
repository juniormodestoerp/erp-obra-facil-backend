import { EntriesByCenterUseCase } from '@modules/metrics/use-cases/entries-by-center-use-case'

export function makeEntriesByCenterUseCase() {
	return new EntriesByCenterUseCase()
}
