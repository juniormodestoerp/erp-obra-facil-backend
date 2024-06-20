import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Transaction } from '@modules/transactions/entities/transaction'
import type { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'
import type { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
	id: string
	userId: string
	fitId: string
	trnType: string
	name: string
	description: string
	accountType: string
	categoryId: string
	categoryName?: string
	establishmentName: string
	bankName: string
	transactionDate: Date
	previousBalance: number
	totalAmount: number
	currentBalance: number
	paymentMethod: string
	competencyDate: Date | null
	costAndProfitCenters: string | null
	tags: string | null
	documentNumber: string | null
	associatedContracts: string | null
	associatedProjects: string | null
	additionalComments: string | null
	status: string
	createdAt: Date
}

interface Output {
	transaction: Transaction
}

export class AddTransactionUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	async execute({
		id,
		userId,
		fitId,
		trnType,
		name,
		description,
		accountType,
		categoryId,
		categoryName,
		establishmentName,
		bankName,
		transactionDate,
		previousBalance,
		totalAmount,
		currentBalance,
		paymentMethod,
		competencyDate,
		costAndProfitCenters,
		tags,
		documentNumber,
		associatedContracts,
		associatedProjects,
		additionalComments,
		status,
		createdAt,
	}: Input): Promise<Output> {
		const user = await this.usersRepository.findById({ userId })

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const alreadyTransaction = await this.transactionsRepository.findById({ userId, id })

		if (alreadyTransaction) {
			throw new AppError({
				code: 'transaction.already_exists',
			})
		}

		const transaction = Transaction.create({
			userId,
			fitId,
			trnType,
			name,
			description,
			accountType,
			categoryId,
			categoryName,
			establishmentName,
			bankName,
			transactionDate,
			previousBalance,
			totalAmount,
			currentBalance,
			paymentMethod,
			competencyDate,
			costAndProfitCenters,
			tags,
			documentNumber,
			associatedContracts,
			associatedProjects,
			additionalComments,
			status,
			createdAt,
		}, new UniqueEntityID(id))

		console.log(transaction)

		await this.transactionsRepository.create(transaction)

		return {
			transaction,
		}
	}
}
