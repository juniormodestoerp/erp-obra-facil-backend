import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeEntriesByContactUseCase } from '@modules/metrics/use-cases/factories/make-entries-by-contact-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function entriesByContactController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const entriesByContactUseCase = makeEntriesByContactUseCase()

	await entriesByContactUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send()
}
