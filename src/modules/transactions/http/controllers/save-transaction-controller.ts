import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeSaveTransactionUseCase } from '@modules/transactions/use-cases/factories/make-save-transaction-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('id das configurações'))
		.uuid({ message: 'O campo id das configurações deve ser um UUID válido.' })
		.min(1, 'O campo id das configurações é obrigatório.')
		.optional(),
})

const bodySchema = z.object({
	name: z.string(strMessage('nome')),
	description: z.string(strMessage('descrição')),
	categoryId: z.string(strMessage('categoria')),
	establishmentName: z.string(strMessage('nome do estabelecimento')),
	bankName: z.string(strMessage('nome do banco')),
	transactionDate: z.string(strMessage('data da transação')),
	previousBalance: z.number(strMessage('saldo anterior')),
	totalAmount: z.number(strMessage('valor total')),
	currentBalance: z.number(strMessage('saldo atual')),
	paymentMethod: z.string(strMessage('forma de pagamento')),
	status: z.string(strMessage('status')),
	accountType: z.string(strMessage('tipo de conta')),
	fitId: z.string(strMessage('id do fit')).nullable(),
	accountToTransfer: z
		.string(strMessage('conta para transferência'))
		.nullable(),
	contact: z.string(strMessage('contato')).nullable(),
	card: z.string(strMessage('cartão')).nullable(),
	competencyDate: z.string(strMessage('data de competência')).nullable(),
	costAndProfitCenters: z.string(strMessage('centro de custo')).nullable(),
	tags: z.string(strMessage('tags')).nullable(),
	documentNumber: z.string(strMessage('número do documento')).nullable(),
	associatedContracts: z.string(strMessage('contratos associados')).nullable(),
	associatedProjects: z.string(strMessage('projetos associados')).nullable(),
	additionalComments: z.string(strMessage('comentários adicionais')).nullable(),
})

export async function saveTransaction(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)
	const {
		name,
		description,
		categoryId,
		establishmentName,
		bankName,
		transactionDate,
		previousBalance,
		totalAmount,
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
	} = bodySchema.parse(request.body)

	const saveTransactionUseCase = makeSaveTransactionUseCase()

	await saveTransactionUseCase.execute({
		id,
		userId: request.user.sub,
		name,
		description,
		categoryId,
		establishmentName,
		bankName,
		transactionDate,
		previousBalance,
		totalAmount,
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
	})

	return reply.status(201).send()
}
