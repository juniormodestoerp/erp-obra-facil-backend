import { EvolutionByCategoryUseCase } from '@modules/metrics/use-cases/evolution-by-category-use-case'

export function makeEvolutionByCategoryUseCase() {
	return new EvolutionByCategoryUseCase()
}
