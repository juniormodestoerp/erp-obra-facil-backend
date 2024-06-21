import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makePaidAccountsUseCase } from '@modules/metrics/use-cases/factories/make-paid-accounts-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function paidAccountsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const paidAccountsUseCase = makePaidAccountsUseCase()

	await paidAccountsUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send()
}
