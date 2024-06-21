import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeCashEntriesUseCase } from '@modules/metrics/use-cases/factories/make-cash-entries-factory'

export async function cashEntriesController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const cashEntriesUseCase = makeCashEntriesUseCase()

	const { transactions } = await cashEntriesUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
