import type { CostAndProfitCenter } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'

export class CostAndProfitCentersViewModel {
	static toHTTP(costAndProfitCenter: CostAndProfitCenter) {
		return {
			id: costAndProfitCenter.id,
			name: costAndProfitCenter.name,
			createdAt: costAndProfitCenter.createdAt,
		}
	}
}
