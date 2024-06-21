import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeEntriesByProjectUseCase } from '@modules/metrics/use-cases/factories/make-entries-by-project-factory'

export async function entriesByProjectController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const entriesByProjectUseCase = makeEntriesByProjectUseCase()

	const { transactions } = await entriesByProjectUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
