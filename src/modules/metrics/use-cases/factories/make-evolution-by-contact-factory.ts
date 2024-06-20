import { EvolutionByContactUseCase } from '@modules/metrics/use-cases/evolution-by-contact-use-case'

export function makeEvolutionByContactUseCase() {
	return new EvolutionByContactUseCase()
}
