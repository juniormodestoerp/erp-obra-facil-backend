import type { FastifyReply, FastifyRequest } from 'fastify'

import { makePaidAccountsUseCase } from '@modules/metrics/use-cases/factories/make-paid-accounts-factory'

export async function paidAccountsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const paidAccountsUseCase = makePaidAccountsUseCase()

	const { transactions } = await paidAccountsUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
