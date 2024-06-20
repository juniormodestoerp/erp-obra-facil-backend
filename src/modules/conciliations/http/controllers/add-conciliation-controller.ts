import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeAddTransactionUseCase } from '@modules/conciliations/use-cases/factories/make-add-transaction-factory'

const schema = z.object({
	id: z.string(strMessage('identificador do usuário')),
	userId: z.string(strMessage('identificador do usuário')).nullish(),
	fitId: z.string(strMessage('identificador FIT')).nullish(),
	trnType: z.string(strMessage('tipo de transação')).optional(),
	name: z.string(strMessage('nome do lançamento')),
	description: z.string(strMessage('descrição')),
	accountType: z.string(strMessage('tipo de conta')),
	categoryId: z.string(strMessage('categoria')).nullish(),
	categoryName: z.string(strMessage('nome da categoria')).optional(),
	establishmentName: z.string(strMessage('nome do estabelecimento')),
	bankName: z.string(strMessage('nome do banco')),
	transactionDate: z.coerce.date(dateMessage('data da transação')),
	previousBalance: z.coerce.number(numbMessage('saldo anterior')),
	totalAmount: z.coerce.number(numbMessage('valor total')),
	currentBalance: z.coerce.number(numbMessage('saldo atual')),
	paymentMethod: z.string(strMessage('forma de pagamento')),
	competencyDate: z.coerce.date(dateMessage('data de competência')).nullable(),
	costAndProfitCenters: z.string(strMessage('centro de custo')).nullable(),
	tags: z.string(strMessage('tags')).nullable(),
	documentNumber: z.string(strMessage('número do documento')).nullable(),
	associatedContracts: z.string(strMessage('contratos associados')).nullable(),
	associatedProjects: z.string(strMessage('projetos associados')).nullable(),
	additionalComments: z.string(strMessage('comentários adicionais')).nullable(),
	status: z.string(strMessage('status')),
	accountToTransfer: z
		.string(strMessage('conta para transferência'))
		.nullable(),
	contact: z.string(strMessage('contato')).nullable(),
	card: z.string(strMessage('cartão')).nullable(),
	createdAt: z.coerce.date(dateMessage('data de criação')).nullish(),
})

export async function addConciliationController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	console.log('CHEGOU NO CONTROLLER 1')

	const {
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
		accountToTransfer,
		contact,
		card,
		createdAt,
	} = schema.parse(request.body)

	const addTransactionUseCase = makeAddTransactionUseCase()

	const { transaction } = await addTransactionUseCase.execute({
		id,
		userId: userId ?? request.user.sub,
		fitId: fitId ?? null,
		trnType,
		name,
		description,
		accountType,
		categoryId: categoryId ?? undefined,
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
		accountToTransfer,
		contact,
		card,
		createdAt: createdAt ?? new Date(),
	})

	return reply.status(201).send({
		transaction,
	})
}
