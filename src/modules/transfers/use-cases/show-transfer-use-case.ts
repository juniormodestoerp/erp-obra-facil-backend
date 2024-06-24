import { AppError } from '@core/domain/errors/app-error'

import type { Transfer } from '@modules/transfers/entities/transfer'
import type { TransfersRepository } from '@modules/transfers/repositories/transfers-repository'

interface Input {
	id: string
}

interface Output {
	transfer: Transfer
}

export class ShowTransferUseCase {
	constructor(private readonly transfersRepository: TransfersRepository) {}

	async execute({ id }: Input): Promise<Output> {
		const transfer = await this.transfersRepository.findById(id)

		if (!transfer) {
			throw new AppError({
				code: 'transfer.not_found',
			})
		}

		return {
			transfer,
		}
	}
}
