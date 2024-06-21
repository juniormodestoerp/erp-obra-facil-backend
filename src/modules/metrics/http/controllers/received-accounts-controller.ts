import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeReceivedAccountsUseCase } from '@modules/metrics/use-cases/factories/make-received-accounts-factory'

export async function receivedAccountsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const receivedAccountsUseCase = makeReceivedAccountsUseCase()

	const { transactions } = await receivedAccountsUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
