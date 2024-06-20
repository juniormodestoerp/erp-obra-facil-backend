import { ProjectResultsUseCase } from '@modules/metrics/use-cases/project-results-use-case'

export function makeProjectResultsUseCase() {
	return new ProjectResultsUseCase()
}
