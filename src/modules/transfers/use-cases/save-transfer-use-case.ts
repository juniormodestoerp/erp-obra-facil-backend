import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Transfer } from '@modules/transfers/entities/transfer'
import type { TransfersRepository } from '@modules/transfers/repositories/transfers-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	userId: string
	name: string
}

interface Output {
	transfer: Transfer
}

export class SaveTransferUseCase {
	constructor(
		private readonly transfersRepository: TransfersRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({
		id,
		userId,
		name,
	}: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const previusTransfer = await this.transfersRepository.findById(id)

		if (!previusTransfer) {
			throw new AppError({
				code: 'transfers.not_found',
			})
		}

		const transfer = Transfer.create(
			{
				name,
				createdAt: previusTransfer.createdAt,
				updatedAt: new Date(),
				deletedAt: previusTransfer.deletedAt,
				transferOption: previusTransfer.transferOption,
			},
			new UniqueEntityID(id),
		)

		await this.transfersRepository.save(transfer)

		return {
			transfer,
		}
	}
}
