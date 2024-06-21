import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeEvolutionByCenterUseCase } from '@modules/metrics/use-cases/factories/make-evolution-by-center-factory'

export async function evolutionByCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const evolutionByCenterUseCase = makeEvolutionByCenterUseCase()

	const { transactions } = await evolutionByCenterUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
