import { AppError } from '@core/domain/errors/app-error'

import { Transfer } from '@modules/transfers/entities/transfer'
import type { TransfersRepository } from '@modules/transfers/repositories/transfers-repository'

interface Input {
	name: string
}

interface Output {
	transfer: Transfer
}

export class CreateTransferUseCase {
	constructor(private readonly transfersRepository: TransfersRepository) {}

	async execute({ name }: Input): Promise<Output> {
		const existsTransfer = await this.transfersRepository.findByName(name)

		if (existsTransfer) {
			throw new AppError({
				code: 'transfer.already_exists',
			})
		}

		const transfer = Transfer.create({
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			transferOption: [],
		})

		await this.transfersRepository.create(transfer)

		return {
			transfer,
		}
	}
}
