import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeEvolutionByCategoryUseCase } from '@modules/metrics/use-cases/factories/make-evolution-by-category-factory'

export async function evolutionByCategoryController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const evolutionByCategoryUseCase = makeEvolutionByCategoryUseCase()

	const { transactions } = await evolutionByCategoryUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
