import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeTotalsByCenterUseCase } from '@modules/metrics/use-cases/factories/make-totals-by-center-factory'

export async function totalsByCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const totalsByCenterUseCase = makeTotalsByCenterUseCase()

	const { transactions } = await totalsByCenterUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
