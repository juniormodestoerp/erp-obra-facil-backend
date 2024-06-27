import { AppError } from '@core/domain/errors/app-error'
import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'
import { Utils } from '@core/utils/string'
import { PrismaAccountsMapper } from '@modules/accounts/repositories/prisma/mappers/prisma-accounts-mapper'
import { PrismaCategoriesMapper } from '@modules/categories/repositories/prisma/mappers/prisma-categories-mapper'
import { PrismaCentersMapper } from '@modules/cost-and-profit-centers/repositories/prisma/mappers/prisma-cost-and-profit-centers-mapper'
import { PrismaMethodsMapper } from '@modules/methods/repositories/prisma/mappers/prisma-methods-mapper'
import { PrismaTagsMapper } from '@modules/tags/repositories/prisma/mappers/prisma-tags-mapper'
import { Transaction } from '@modules/transactions/entities/transaction'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'
import { prisma } from '@shared/infra/database/prisma'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
	type: z.string(strMessage('tipo')),
	date: z.string(dateMessage('data')),
	amount: z.number(numbMessage('valor')),
	description: z.string(strMessage('descrição')),
	account: z.string(strMessage('conta')),
	status: z.string(strMessage('status')),
	card: z.string(strMessage('cartão')).nullable().default(null),
	category: z.string(strMessage('categoria')).nullable().default(null),
	contact: z.string(strMessage('contato')).nullable().default(null),
	center: z.string(strMessage('centro')).nullable().default(null),
	project: z.string(strMessage('projeto')).nullable().default(null),
	method: z.string(strMessage('forma')).nullable().default(null),
	documentNumber: z.string(strMessage('nº documento')).nullable().default(null),
	notes: z.string(strMessage('observações')).nullable().default(null),
	competenceDate: z
		.string(dateMessage('data competência'))
		.nullable()
		.default(null),
	tags: z.string(strMessage('tags')).nullable().default(null),
})

type ITransaction = z.infer<typeof bodySchema>

export async function addOneController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const parsedBody: ITransaction = bodySchema.parse(request.body)
	const formattedBody = {
		...parsedBody,
		date: Utils.parseDate(parsedBody.date),
		competenceDate: parsedBody.competenceDate
			? Utils.parseDate(parsedBody.competenceDate)
			: null,
	}

	const existingTransaction = await prisma.transaction.findFirst({
		where: {
			date: formattedBody.date,
			amount: formattedBody.amount,
			description: formattedBody.description,
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
			name: formattedBody.account as string,
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
			name: formattedBody.category as string,
		},
	})

	const center = await prisma.center.findFirst({
		where: {
			userId: request.user.sub,
			name: formattedBody.center as string,
		},
	})

	const method = await prisma.method.findFirst({
		where: {
			userId: request.user.sub,
			name: formattedBody.method as string,
		},
	})

	const tags = await prisma.tag.findFirst({
		where: {
			userId: request.user.sub,
			name: formattedBody.tags as string,
		},
	})

	const transaction = Transaction.create({
		userId: request.user.sub,
		date: formattedBody.date,
		amount: formattedBody.amount,
		description: formattedBody.description,
		transferAccount: formattedBody.transferAccount,
		card: formattedBody.card,
		contact: formattedBody.contact,
		project: formattedBody.project,
		documentNumber: formattedBody.documentNumber,
		notes: formattedBody.notes,
		competenceDate: formattedBody.competenceDate,
		createdAt: new Date(),
		updatedAt: new Date(),
		user: request.user.data,
		account: PrismaAccountsMapper.toDomain(account),
		category: category ? PrismaCategoriesMapper.toDomain(category) : null,
		center: center ? PrismaCentersMapper.toDomain(center) : null,
		method: method ? PrismaMethodsMapper.toDomain(method) : null,
		tags: tags ? [PrismaTagsMapper.toDomain(tags)] : [],
	})

	try {
		await prisma.$transaction(async (tsx) => {
			await tsx.transaction.create({
				data: PrismaTransactionsMapper.toPrisma(transaction),
			})
		})
	} catch (error) {
		console.log('erro ao cria lançamento', error)
	}

	reply.status(200).send(transaction)
}
