import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeEntriesByCategoryUseCase } from '@modules/metrics/use-cases/factories/make-entries-by-category-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function entriesByCategoryController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const entriesByCategoryUseCase = makeEntriesByCategoryUseCase()

	await entriesByCategoryUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send()
}
