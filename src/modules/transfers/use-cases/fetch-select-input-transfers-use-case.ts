import { AppError } from '@core/domain/errors/app-error'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'
import type { TransfersRepository } from '@modules/transfers/repositories/transfers-repository'

interface Output {
	transfers: ISelectInputDTO[]
}

export class FetchSelectInputTransfersUseCase {
	constructor(
		private readonly transfersRepository: TransfersRepository,
	) {}

	async execute(): Promise<Output> {
		const transfers = await this.transfersRepository.selectInput()

		if (transfers.length === 0) {
			throw new AppError({
				code: 'transfers.not_found',
			})
		}

		return {
			transfers,
		}
	}
}
