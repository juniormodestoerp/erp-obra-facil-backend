import { AppError } from '@core/domain/errors/app-error'
import { Utils } from '@core/utils/string'
import { PrismaAccountsMapper } from '@modules/accounts/repositories/prisma/mappers/prisma-accounts-mapper'
import { PrismaCategoriesMapper } from '@modules/categories/repositories/prisma/mappers/prisma-categories-mapper'
import type { Center } from '@modules/centers/entities/center'
import { PrismaCentersMapper } from '@modules/centers/repositories/prisma/mappers/prisma-centers-mapper'
import type { Method } from '@modules/methods/entities/method'
import { PrismaMethodsMapper } from '@modules/methods/repositories/prisma/mappers/prisma-methods-mapper'
import type { Tag } from '@modules/tags/entities/tag'
import { PrismaTagsMapper } from '@modules/tags/repositories/prisma/mappers/prisma-tags-mapper'

import { Transaction } from '@modules/transactions/entities/transaction'
import type { DomainTransactionsRepository } from '@modules/transactions/repositories/domain-transactions-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'
import { prisma } from '@shared/infra/database/prisma'

interface Input {
	userId: string
	type: string
	date: string
	amount: number
	description: string
	account: string
	status: string
	category: string
	card: string | null
	contact: string | null
	center: string | null
	project: string | null
	method: string | null
	documentNumber: string | null
	notes: string | null
	competenceDate: string | null
	tag: string | null
}

interface Output {
	transaction: Transaction
}

export class CreateTransactionUseCase {
	constructor(
		private readonly DomainTransactionsRepository: DomainTransactionsRepository,
		private readonly usersRepository: DomainUsersRepository,
	) {}

	async execute({
		userId,
		type,
		date,
		amount,
		description,
		account,
		status,
		card,
		category,
		contact,
		center,
		project,
		method,
		documentNumber,
		notes,
		competenceDate,
		tag,
	}: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const existsTransaction =
			await this.DomainTransactionsRepository.verifyIfExists({
				userId,
				date: Utils.parseDate(date),
				amount,
				description,
			})

		if (existsTransaction) {
			throw new AppError({
				code: 'transaction.already_exists',
			})
		}

		const existsAccount = await prisma.account.findUnique({
			where: { userId, name: account },
		})

		if (!existsAccount) {
			throw new AppError({ code: 'bank_account.not_found' })
		}

		const accountEntity = PrismaAccountsMapper.toDomain(existsAccount)

		const existsCategory = await prisma.category.findUnique({
			where: { userId, name: category },
		})

		if (!existsCategory) {
			throw new AppError({ code: 'category.not_found' })
		}

		const categoryEntity = PrismaCategoriesMapper.toDomain(existsCategory)

		let methodEntity: Method | null = null

		if (method) {
			const existsMethod = await prisma.method.findUnique({
				where: {
					userId,
					name: method,
				},
			})
			if (existsMethod) {
				methodEntity = PrismaMethodsMapper.toDomain(existsMethod)
			} else {
				methodEntity = null
			}
		}

		let centerEntity: Center | null = null

		if (center) {
			const existsCenter = await prisma.center.findUnique({
				where: {
					userId,
					name: center,
				},
			})
			if (existsCenter) {
				centerEntity = PrismaCentersMapper.toDomain(existsCenter)
			} else {
				centerEntity = null
			}
		}

		let tagEntity: Tag | null = null

		if (tag) {
			const existsTag = await prisma.tag.findUnique({
				where: {
					userId,
					name: tag,
				},
			})
			if (existsTag) {
				tagEntity = PrismaTagsMapper.toDomain(existsTag)
			} else {
				tagEntity = null
			}
		}

		user.balance += amount

		await this.usersRepository.save(user)

		const transaction = Transaction.create({
			userId,
			accountId: accountEntity.id,
			categoryId: categoryEntity.id,
			centerId: centerEntity ? centerEntity.id : null,
			methodId: methodEntity ? methodEntity.id : null,
			tagId: tagEntity ? tagEntity.id : null,
			type,
			date: Utils.parseDate(date),
			amount,
			description,
			account: accountEntity,
			status,
			card,
			category: categoryEntity,
			contact,
			center: centerEntity,
			project,
			method: methodEntity,
			documentNumber,
			notes,
			competenceDate: competenceDate ? Utils.parseDate(competenceDate) : null,
			tag: tagEntity,
			user,
		})

		await this.DomainTransactionsRepository.create(transaction)

		return {
			transaction,
		}
	}
}
