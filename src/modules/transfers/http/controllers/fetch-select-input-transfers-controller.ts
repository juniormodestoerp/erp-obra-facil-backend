import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSelectInputTransfersUseCase } from '@modules/transfers/use-cases/factories/make-fetch-select-input-transfers-factory'

export async function fetchSelectInputTransfersController(
	_: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchSelectInputTransfersUseCase =
		makeFetchSelectInputTransfersUseCase()

	const { transfers } = await fetchSelectInputTransfersUseCase.execute()

	return reply.status(200).send(transfers)
}
