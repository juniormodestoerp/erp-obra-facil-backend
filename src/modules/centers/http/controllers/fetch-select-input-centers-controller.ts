import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSelectInputCentersUseCase } from '@modules/centers/use-cases/factories/make-fetch-select-input-centers-factory'

export async function fetchSelectInputCentersController(
	_: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchSelectInputCentersUseCase = makeFetchSelectInputCentersUseCase()

	const { centers } = await fetchSelectInputCentersUseCase.execute()

	return reply.status(200).send(centers)
}
