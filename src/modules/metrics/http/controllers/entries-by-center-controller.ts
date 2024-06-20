import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeEntriesByCenterUseCase } from '@modules/metrics/use-cases/factories/make-entries-by-center-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function entriesByCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const entriesByCenterUseCase = makeEntriesByCenterUseCase()

	await entriesByCenterUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
