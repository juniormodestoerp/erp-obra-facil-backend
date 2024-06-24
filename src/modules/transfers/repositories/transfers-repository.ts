import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { Transfer } from '@modules/transfers/entities/transfer'

export interface TransfersRepository {
	findById(id: string): Promise<Transfer | null>
	findByName(name: string): Promise<Transfer | null>
	findMany(): Promise<Transfer[]>
	selectInput(): Promise<ISelectInputDTO[]>
	create(transfer: Transfer): Promise<void>
	save(transfer: Transfer): Promise<void>
	remove(id: string): Promise<void>
}
