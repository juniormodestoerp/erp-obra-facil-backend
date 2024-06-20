import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeProjectResultsUseCase } from '@modules/metrics/use-cases/factories/make-project-results-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function projectResultsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const projectResultsUseCase = makeProjectResultsUseCase()

	await projectResultsUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
