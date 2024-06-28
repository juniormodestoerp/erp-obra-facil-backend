import { AppError } from '@core/domain/errors/app-error'
import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'
import { Utils } from '@core/utils/string'
import { PrismaAccountsMapper } from '@modules/accounts/repositories/prisma/mappers/prisma-accounts-mapper'
import { PrismaCategoriesMapper } from '@modules/categories/repositories/prisma/mappers/prisma-categories-mapper'
import { PrismaCentersMapper } from '@modules/centers/repositories/prisma/mappers/prisma-centers-mapper'
import { PrismaMethodsMapper } from '@modules/methods/repositories/prisma/mappers/prisma-methods-mapper'
import { PrismaTagsMapper } from '@modules/tags/repositories/prisma/mappers/prisma-tags-mapper'
import { Transaction } from '@modules/transactions/entities/transaction'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'
import { prisma } from '@shared/infra/database/prisma'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface ITransactionInput {
	id?: string
	date: string
	amount: number
	description: string
	account: string | null
	transferAccount: string | null
	card: string | null
	category: string | null
	subcategory: string | null
	contact: string | null
	center: string | null
	project: string | null
	method: string | null
	documentNumber: string | null
	notes: string | null
	competenceDate: string | null
	tags: string | null
}

const bodySchema = z
	.object({
		date: z.string(dateMessage('data')),
		amount: z.number(numbMessage('valor')),
		description: z.string(strMessage('descrição')),
		account: z.string(strMessage('conta')).nullable(),
		transferAccount: z.string(strMessage('conta transferência')).nullable(),
		card: z.string(strMessage('cartão')).nullable(),
		category: z.string(strMessage('Categoria')).nullable(),
		subcategory: z.string(strMessage('Subcategoria')).nullable(),
		contact: z.string(strMessage('Contato')).nullable(),
		center: z.string(strMessage('Centro')).nullable(),
		project: z.string(strMessage('Projeto')).nullable(),
		method: z.string(strMessage('Forma')).nullable(),
		documentNumber: z.string(strMessage('N. Documento')).nullable(),
		notes: z.string(strMessage('Observações')).nullable(),
		competenceDate: z.coerce.string(dateMessage('Data Competência')).nullable(),
		tags: z.string(strMessage('Tags')).nullable(),
	})
	.array()

export async function addManyController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const parsedBody = bodySchema.parse(request.body)

	const formattedBody = parsedBody.map((transaction) => ({
		...transaction,
		date: Utils.parseDate(transaction.date),
		competenceDate: transaction.competenceDate
			? Utils.parseDate(transaction.competenceDate)
			: null,
	}))

	const transactionsToCreate: Transaction[] = []

	for (const transaction of formattedBody) {
		const existingTransaction = await prisma.transaction.findFirst({
			where: {
				date: transaction.date,
				amount: transaction.amount,
				description: transaction.description,
			},
			select: {
				date: true,
				amount: true,
				description: true,
			},
		})

		if (existingTransaction) {
			throw new AppError({
				code: 'transaction.already_exists',
			})
		}

		const account = await prisma.account.findFirst({
			where: {
				userId: request.user.sub,
				name: transaction.account as string,
			},
		})

		if (!account) {
			throw new AppError({
				code: 'bank_account.not_found',
			})
		}

		const category = await prisma.category.findFirst({
			where: {
				userId: request.user.sub,
				name: transaction.category as string,
			},
		})

		if (!category) {
			throw new AppError({
				code: 'category.not_found',
			})
		}

		const center = await prisma.center.findFirst({
			where: {
				userId: request.user.sub,
				name: transaction.center as string,
			},
		})

		const method = await prisma.method.findFirst({
			where: {
				userId: request.user.sub,
				name: transaction.method as string,
			},
		})

		const tags = await prisma.tag.findFirst({
			where: {
				userId: request.user.sub,
				name: transaction.tags as string,
			},
		})

		const newTransaction = Transaction.create({
			userId: request.user.sub,
			accountId: account.id,
			categoryId: category?.id,
			centerId: center ? center?.id : null,
			methodId: method ? method?.id : null,
			tagId: tags ? tags?.id : null,
			status: 'pending',
			type: transaction.amount > 0 ? 'Receita' : 'Despesa',
			date: transaction.date,
			amount: transaction.amount,
			description: transaction.description,
			card: transaction.card,
			contact: transaction.contact,
			project: transaction.project,
			documentNumber: transaction.documentNumber,
			notes: transaction.notes,
			competenceDate: transaction.competenceDate,
			createdAt: new Date(),
			updatedAt: new Date(),
			user: request.user.data,
			account: PrismaAccountsMapper.toDomain(account),
			category: category ? PrismaCategoriesMapper.toDomain(category) : null,
			center: center ? PrismaCentersMapper.toDomain(center) : null,
			method: method ? PrismaMethodsMapper.toDomain(method) : null,
			tag: tags ? PrismaTagsMapper.toDomain(tags) : null,
		})

		transactionsToCreate.push(newTransaction)
	}

	try {
		await prisma.$transaction(async (tsx) => {
			for (const transaction of transactionsToCreate) {
				await tsx.transaction.create({
					data: PrismaTransactionsMapper.toPrisma(transaction),
				})
			}
		})
	} catch (error) {
		console.log('Erro ao criar lançamentos', error)
		throw new AppError({
			code: 'transaction.not_found',
		})
	}

	reply.status(200).send(transactionsToCreate)
}
