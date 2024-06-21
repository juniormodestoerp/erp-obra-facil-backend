import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeReceivedAccountsUseCase } from '@modules/metrics/use-cases/factories/make-received-accounts-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function receivedAccountsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const receivedAccountsUseCase = makeReceivedAccountsUseCase()

	await receivedAccountsUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send()
}
