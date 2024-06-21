import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeEntriesByContactUseCase } from '@modules/metrics/use-cases/factories/make-entries-by-contact-factory'

export async function entriesByContactController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const entriesByContactUseCase = makeEntriesByContactUseCase()

	const { transactions } = await entriesByContactUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(transactions)
}
