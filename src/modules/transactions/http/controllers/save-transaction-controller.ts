import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { dateMessage, numbMessage, strMessage } from '@core/utils/custom-zod-error'

import { makeSaveTransactionUseCase } from '@modules/transactions/use-cases/factories/make-save-transaction-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('id das configurações'))
		.uuid({ message: 'O campo id das configurações deve ser um UUID válido.' })
		.min(1, 'O campo id das configurações é obrigatório.')
		.optional(),
})

const bodySchema = z.object({
	type: z.string(strMessage('tipo')),
	date: z.string(dateMessage('data')),
	amount: z.number(numbMessage('valor')),
	description: z.string(strMessage('descrição')),
	account: z.string(strMessage('conta')),
	status: z.string(strMessage('status')),
	category: z.string(strMessage('categoria')),
	card: z.string(strMessage('cartão')).nullable().default(null),
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
	tag: z.string(strMessage('tag')).nullable().default(null),
})

export async function saveTransaction(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)
	const {
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
	} = bodySchema.parse(request.body)

	const saveTransactionUseCase = makeSaveTransactionUseCase()

	await saveTransactionUseCase.execute({
		id,
		userId: request.user.sub,
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
	})

	return reply.status(201).send()
}
