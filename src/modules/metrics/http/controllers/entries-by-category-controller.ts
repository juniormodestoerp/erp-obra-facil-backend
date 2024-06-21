import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeEntriesByCategoryUseCase } from '@modules/metrics/use-cases/factories/make-entries-by-category-factory'

export async function entriesByCategoryController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const entriesByCategoryUseCase = makeEntriesByCategoryUseCase()

	const { transactions } = await entriesByCategoryUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
