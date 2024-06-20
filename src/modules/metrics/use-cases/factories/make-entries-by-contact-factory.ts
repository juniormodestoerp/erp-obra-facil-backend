import { EntriesByContactUseCase } from '@modules/metrics/use-cases/entries-by-contact-use-case'

export function makeEntriesByContactUseCase() {
	return new EntriesByContactUseCase()
}
