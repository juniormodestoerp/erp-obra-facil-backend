import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeEvolutionByCategoryUseCase } from '@modules/metrics/use-cases/factories/make-evolution-by-category-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function evolutionByCategoryController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const evolutionByCategoryUseCase = makeEvolutionByCategoryUseCase()

	await evolutionByCategoryUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
