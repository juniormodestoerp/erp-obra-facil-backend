import type { FastifyReply, FastifyRequest } from 'fastify'

import { TransfersViewModel } from '@modules/transfers/http/view-models/transfers-view-model'
import { makeFetchTransfersUseCase } from '@modules/transfers/use-cases/factories/make-fetch-transfers-factory'

export async function fetchTransfersController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchTransfersUseCase = makeFetchTransfersUseCase()

	const { transfers } = await fetchTransfersUseCase.execute({
		userId: request.user.sub,
	})

	return reply
		.status(200)
		.send(
			transfers.map((transfer) => TransfersViewModel.toHTTP(transfer) ?? []),
		)
}
