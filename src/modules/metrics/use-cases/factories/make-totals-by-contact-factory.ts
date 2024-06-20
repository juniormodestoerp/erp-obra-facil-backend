import { TotalsByContactUseCase } from '@modules/metrics/use-cases/totals-by-contact-use-case'

export function makeTotalsByContactUseCase() {
	return new TotalsByContactUseCase()
}
