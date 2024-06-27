import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeCreateTransactionUseCase } from '@modules/transactions/use-cases/factories/make-create-transaction-factory'

const schema = z.object({
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
	tags: z
		.array(z.string(strMessage('tags')))
		.nullable()
		.default(null),
})

export async function createTransaction(
	request: FastifyRequest,
	reply: FastifyReply,
) {
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
		tags,
	} = schema.parse(request.body)

	const createTransactionUseCase = makeCreateTransactionUseCase()

	const { transaction } = await createTransactionUseCase.execute({
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
		tags,
	})

	return reply.status(201).send()
}
