import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeAccountsReceivableUseCase } from '@modules/metrics/use-cases/factories/make-accounts-receivable-factory'

export async function accountsReceivableController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const accountsReceivableUseCase = makeAccountsReceivableUseCase()

	const { transactions } = await accountsReceivableUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
