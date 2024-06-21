import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeCashFlowUseCase } from '@modules/metrics/use-cases/factories/make-cash-flow-factory'

export async function cashFlowController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const cashFlowUseCase = makeCashFlowUseCase()

	const { transactions } = await cashFlowUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
