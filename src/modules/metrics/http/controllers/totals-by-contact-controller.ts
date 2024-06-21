import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeTotalsByContactUseCase } from '@modules/metrics/use-cases/factories/make-totals-by-contact-factory'

export async function totalsByContactController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const totalsByContactUseCase = makeTotalsByContactUseCase()

	const { transactions } = await totalsByContactUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
