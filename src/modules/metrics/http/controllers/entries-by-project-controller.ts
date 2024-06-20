import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeEntriesByProjectUseCase } from '@modules/metrics/use-cases/factories/make-entries-by-project-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function entriesByProjectController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const entriesByProjectUseCase = makeEntriesByProjectUseCase()

	await entriesByProjectUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
