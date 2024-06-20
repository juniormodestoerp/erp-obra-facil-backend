import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeTotalsByProjectUseCase } from '@modules/metrics/use-cases/factories/make-totals-by-project-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function totalsByProjectController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const totalsByProjectUseCase = makeTotalsByProjectUseCase()

	await totalsByProjectUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
