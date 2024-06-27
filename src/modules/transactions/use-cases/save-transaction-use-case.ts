import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Transaction } from '@modules/transactions/entities/transaction'
import type { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id?: string
	userId: string
	name: string
	description: string
	categoryId: string
	establishmentName: string
	bankName: string
	date: string
	previousBalance: number
	amount: number
	currentBalance: number
	paymentMethod: string
	status: string
	accountType: string
	fitId: string | null
	accountToTransfer: string | null
	contact: string | null
	card: string | null
	competencyDate: string | null
	costAndProfitCenters: string | null
	tags: string | null
	documentNumber: string | null
	associatedContracts: string | null
	associatedProjects: string | null
	additionalComments: string | null
}

export class SaveTransactionUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({
		id,
		userId,
		name,
		description,
		categoryId,
		establishmentName,
		bankName,
		date,
		previousBalance,
		amount,
		currentBalance,
		paymentMethod,
		status,
		accountType,
		fitId,
		accountToTransfer,
		contact,
		card,
		competencyDate,
		costAndProfitCenters,
		tags,
		documentNumber,
		associatedContracts,
		associatedProjects,
		additionalComments,
	}: Input): Promise<void> {
		const user = await this.usersRepository.findById({ userId })
		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const transaction = Transaction.create(
			{
				userId,
				fitId,
				name,
				description,
				accountType,
				categoryId,
				establishmentName,
				bankName,
				date: new Date(date),
				previousBalance,
				amount,
				currentBalance,
				paymentMethod,
				status,
				accountToTransfer,
				contact,
				card,
				competencyDate: competencyDate ? new Date(competencyDate) : null,
				costAndProfitCenters,
				tags,
				documentNumber,
				associatedContracts,
				associatedProjects,
				additionalComments,
			},
			id ? new UniqueEntityID(id) : undefined,
		)

		await this.transactionsRepository.save(transaction)
	}
}
