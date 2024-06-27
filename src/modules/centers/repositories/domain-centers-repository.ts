import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { Center } from '@modules/centers/entities/center'

export interface DomainCentersRepository {
	findById(id: string): Promise<Center | null>
	findByName(name: string): Promise<Center | null>
	findMany(userId: string): Promise<Center[]>
	selectInput(): Promise<ISelectInputDTO[]>
	create(center: Center): Promise<void>
	save(center: Center): Promise<void>
	remove(id: string): Promise<void>
}
