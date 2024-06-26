import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'
import type { DomainCategoriesRepository } from '@modules/categories/repositories/domain-categories-repository'

import { Transaction } from '@modules/transactions/entities/transaction'
import type { DomainTransactionsRepository } from '@modules/transactions/repositories/domain-transactions-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	id: string
	userId: string
	fitId: string | null
	trnType?: string
	name: string
	description: string
	accountType: string
	categoryId?: string
	categoryName?: string
	establishmentName: string
	bankName: string
	date: Date
	previousBalance: number
	amount: number
	currentBalance: number
	method: string
	competencyDate: Date | null
	centers: string | null
	tags: string | null
	documentNumber: string | null
	associatedContracts: string | null
	associatedProjects: string | null
	additionalComments: string | null
	status: string
	accountToTransfer: string | null
	contact: string | null
	card: string | null
	createdAt: Date
}

interface Output {
	transaction: Transaction
}

export class AddTransactionUseCase {
	constructor(
		private readonly DomainTransactionsRepository: DomainTransactionsRepository,
		private readonly usersRepository: DomainUsersRepository,
		private readonly categoriesRepository: DomainCategoriesRepository,
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
		date,
		previousBalance,
		amount,
		currentBalance,
		method,
		competencyDate,
		centers,
		tags,
		documentNumber,
		associatedContracts,
		associatedProjects,
		additionalComments,
		status,
		accountToTransfer,
		contact,
		card,
		createdAt,
	}: Input): Promise<Output> {
		const user = await this.usersRepository.findById({ userId })

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const alreadyTransaction = await this.DomainTransactionsRepository.findById(
			{
				userId,
				id,
			},
		)

		if (alreadyTransaction) {
			throw new AppError({
				code: 'transaction.already_exists',
			})
		}

		const defaultCategory = await this.categoriesRepository.findByName({
			userId,
			name: 'padrão',
		})

		if (!defaultCategory) {
			throw new AppError({
				code: 'category.not_found',
			})
		}

		const transaction = Transaction.create(
			{
				userId,
				fitId: fitId ?? '',
				name,
				description,
				accountType,
				categoryId: categoryId ?? defaultCategory.id,
				categoryName,
				establishmentName,
				bankName,
				date,
				previousBalance: user.balance,
				amount,
				currentBalance: user.balance + amount,
				method:
					method === 'credit'
						? 'Crédito'
						: 'Débito' ?? trnType === 'credit'
							? 'Crédito'
							: 'Débito',
				competencyDate,
				centers,
				tags,
				documentNumber,
				associatedContracts,
				associatedProjects,
				additionalComments,
				status,
				accountToTransfer,
				contact,
				card,
				createdAt,
			},
			new UniqueEntityID(id),
		)

		await this.DomainTransactionsRepository.create(transaction)

		user.balance = user.balance + amount

		await this.usersRepository.save(user)

		return {
			transaction,
		}
	}
}
