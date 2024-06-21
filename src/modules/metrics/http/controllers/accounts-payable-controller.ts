import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeAccountsPayableUseCase } from '@modules/metrics/use-cases/factories/make-accounts-payable-factory'

export async function accountsPayableController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const accountsPayableUseCase = makeAccountsPayableUseCase()

	const { transactions } = await accountsPayableUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
