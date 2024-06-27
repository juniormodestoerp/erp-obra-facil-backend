import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { Method } from '@modules/methods/entities/method'

export interface DomainMethodsRepository {
	findById(id: string): Promise<Method | null>
	findByName(name: string): Promise<Method | null>
	findMany(userId: string): Promise<Method[]>
	selectInput(): Promise<ISelectInputDTO[]>
	create(method: Method): Promise<void>
	save(method: Method): Promise<void>
	remove(id: string): Promise<void>
}
