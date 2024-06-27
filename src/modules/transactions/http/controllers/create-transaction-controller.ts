import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeCreateTransactionUseCase } from '@modules/transactions/use-cases/factories/make-create-transaction-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
	description: z.string(strMessage('descrição')),
	categoryId: z.string(strMessage('categoria')),
	establishmentName: z.string(strMessage('nome do estabelecimento')),
	bankName: z.string(strMessage('nome do banco')),
	date: z.coerce.date(dateMessage('data da transação')),
	previousBalance: z.coerce.number(numbMessage('saldo anterior')),
	amount: z.coerce.number(numbMessage('valor base do procedimento')),
	currentBalance: z.coerce.number(numbMessage('valor base do procedimento')),
	paymentMethod: z.string(strMessage('forma de pagamento')),

	// Configurações opcionais adicionais
	competencyDate: z.coerce.date(dateMessage('data de competência')).nullable(),
	costAndProfitCenters: z.string(strMessage('centro de custo')).nullable(),
	tags: z.string(strMessage('tags')).nullable(),
	documentNumber: z.string(strMessage('número do documento')).nullable(),
	associatedContracts: z.string(strMessage('contratos assosiados')).nullable(),
	associatedProjects: z.string(strMessage('projetos assosiados')).nullable(),
	additionalComments: z.string(strMessage('comentários adicionais')).nullable(),
})

export async function createTransaction(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const {
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
		competencyDate,
		costAndProfitCenters,
		tags,
		documentNumber,
		associatedContracts,
		associatedProjects,
		additionalComments,
	} = schema.parse(request.body)

	const createTransactionUseCase = makeCreateTransactionUseCase()

	await createTransactionUseCase.execute({
		userId: request.user.sub,
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
		competencyDate,
		costAndProfitCenters,
		tags,
		documentNumber,
		associatedContracts,
		associatedProjects,
		additionalComments,
	})

	return reply.status(201).send()
}
