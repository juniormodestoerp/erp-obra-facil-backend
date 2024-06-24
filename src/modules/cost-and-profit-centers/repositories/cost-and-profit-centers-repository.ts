import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { CostAndProfitCenter } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'

export interface CostAndProfitCentersRepository {
	findById(id: string): Promise<CostAndProfitCenter | null>
	findByName(name: string): Promise<CostAndProfitCenter | null>
	findMany(userId: string): Promise<CostAndProfitCenter[]>
	selectInput(): Promise<ISelectInputDTO[]>
	create(costAndProfitCenter: CostAndProfitCenter): Promise<void>
	save(costAndProfitCenter: CostAndProfitCenter): Promise<void>
	remove(id: string): Promise<void>
}
