import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeAccountsPayableUseCase } from '@modules/metrics/use-cases/factories/make-accounts-payable-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function accountsPayableController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const accountsPayableUseCase = makeAccountsPayableUseCase()

	await accountsPayableUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
