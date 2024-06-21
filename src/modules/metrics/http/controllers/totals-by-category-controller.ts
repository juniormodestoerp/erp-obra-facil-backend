import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeTotalsByCategoryUseCase } from '@modules/metrics/use-cases/factories/make-totals-by-category-factory'

export async function totalsByCategoryController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const totalsByCategoryUseCase = makeTotalsByCategoryUseCase()

	const { transactions } = await totalsByCategoryUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
