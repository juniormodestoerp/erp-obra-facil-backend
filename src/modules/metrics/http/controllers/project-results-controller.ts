import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeProjectResultsUseCase } from '@modules/metrics/use-cases/factories/make-project-results-factory'

export async function projectResultsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const projectResultsUseCase = makeProjectResultsUseCase()

	const { transactions } = await projectResultsUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
