import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeAccountsReceivableUseCase } from '@modules/metrics/use-cases/factories/make-accounts-receivable-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function accountsReceivableController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const accountsReceivableUseCase = makeAccountsReceivableUseCase()

	await accountsReceivableUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send()
}
