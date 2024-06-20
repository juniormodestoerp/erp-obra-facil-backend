import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeTotalsByContactUseCase } from '@modules/metrics/use-cases/factories/make-totals-by-contact-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function totalsByContactController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const totalsByContactUseCase = makeTotalsByContactUseCase()

	await totalsByContactUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
