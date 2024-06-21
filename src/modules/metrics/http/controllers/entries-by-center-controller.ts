import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeEntriesByCenterUseCase } from '@modules/metrics/use-cases/factories/make-entries-by-center-factory'

export async function entriesByCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const entriesByCenterUseCase = makeEntriesByCenterUseCase()

	const { transactions } = await entriesByCenterUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
