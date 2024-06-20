import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeTotalsByCategoryUseCase } from '@modules/metrics/use-cases/factories/make-totals-by-category-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function totalsByCategoryController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const totalsByCategoryUseCase = makeTotalsByCategoryUseCase()

	await totalsByCategoryUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
