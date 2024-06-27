import type { Center } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'

export class CostAndProfitCentersViewModel {
	static toHTTP(center: Center) {
		return {
			id: center.id,
			name: center.name,
			createdAt: center.createdAt,
		}
	}
}
