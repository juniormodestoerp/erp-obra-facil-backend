import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeEvolutionByContactUseCase } from '@modules/metrics/use-cases/factories/make-evolution-by-contact-factory'

export async function evolutionByContactController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const evolutionByContactUseCase = makeEvolutionByContactUseCase()

	const { transactions } = await evolutionByContactUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
