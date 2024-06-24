import { AppError } from '@core/domain/errors/app-error'

import type { TransfersRepository } from '@modules/transfers/repositories/transfers-repository'

interface Input {
	id: string
}

export class RemoveTransferUseCase {
	constructor(
		private readonly transfersRepository: TransfersRepository,
	) {}

	async execute({ id }: Input): Promise<void> {
		const transfer = await this.transfersRepository.findById(id)

		if (!transfer) {
			throw new AppError({
				code: 'transfers.not_found',
			})
		}

		await this.transfersRepository.remove(id)
	}
}
