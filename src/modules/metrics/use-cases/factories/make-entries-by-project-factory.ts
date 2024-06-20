import { EntriesByProjectUseCase } from '@modules/metrics/use-cases/entries-by-project-use-case'

export function makeEntriesByProjectUseCase() {
	return new EntriesByProjectUseCase()
}
