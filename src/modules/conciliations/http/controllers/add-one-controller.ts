import { AppError } from '@core/domain/errors/app-error'
import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'
import { Utils } from '@core/utils/string'
import { BankAccount } from '@modules/bank-accounts/entities/bank-account'
import { PrismaBankAccountsMapper } from '@modules/bank-accounts/repositories/prisma/mappers/prisma-bank-accounts-mapper'
import { PrismaCategoriesMapper } from '@modules/categories/repositories/prisma/mappers/prisma-categories-mapper'
import { PrismaCostAndProfitCentersMapper } from '@modules/cost-and-profit-centers/repositories/prisma/mappers/prisma-cost-and-profit-centers-mapper'
import { PrismaPaymentMethodsMapper } from '@modules/payment-methods/repositories/prisma/mappers/prisma-payment-methods-mapper'
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

const bodySchema = z.object({
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

	const bankAccount = await prisma.bankAccount.findFirst({
		where: {
			userId: request.user.sub,
			name: formattedBody.account as string,
		},
	})

	if (!bankAccount) {
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

	const center = await prisma.costAndProfitCenter.findFirst({
		where: {
			userId: request.user.sub,
			name: formattedBody.center as string,
		},
	})

	const method = await prisma.paymentMethod.findFirst({
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
		account: PrismaBankAccountsMapper.toDomain(bankAccount),
		category: category ? PrismaCategoriesMapper.toDomain(category) : null,
		center: center ? PrismaCostAndProfitCentersMapper.toDomain(center) : null,
		method: method ? PrismaPaymentMethodsMapper.toDomain(method) : null,
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
