import type { FastifyReply, FastifyRequest } from 'fastify'

import { CentersViewModel } from '@modules/centers/http/view-models/centers-view-model'
import { makeFetchCentersUseCase } from '@modules/centers/use-cases/factories/make-fetch-centers-factory'

export async function fetchCentersController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchCentersUseCase = makeFetchCentersUseCase()

	const { centers } = await fetchCentersUseCase.execute({
		userId: request.user.sub,
	})

	return reply
		.status(200)
		.send(centers.map((center) => CentersViewModel.toHTTP(center) ?? []))
}
