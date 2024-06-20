import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeCashEntriesUseCase } from '@modules/metrics/use-cases/factories/make-cash-entries-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function cashEntriesController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const cashEntriesUseCase = makeCashEntriesUseCase()

	await cashEntriesUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
