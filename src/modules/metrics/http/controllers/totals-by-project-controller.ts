import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeTotalsByProjectUseCase } from '@modules/metrics/use-cases/factories/make-totals-by-project-factory'

export async function totalsByProjectController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const totalsByProjectUseCase = makeTotalsByProjectUseCase()

	const { transactions } = await totalsByProjectUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
