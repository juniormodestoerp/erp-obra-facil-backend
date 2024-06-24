import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSelectInputCostAndProfitCentersUseCase } from '@modules/cost-and-profit-centers/use-cases/factories/make-fetch-select-input-cost-and-profit-centers-factory'

export async function fetchSelectInputCostAndProfitCentersController(
	_: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchSelectInputCostAndProfitCentersUseCase =
		makeFetchSelectInputCostAndProfitCentersUseCase()

	const { costAndProfitCenters } = await fetchSelectInputCostAndProfitCentersUseCase.execute()

	return reply.status(200).send(costAndProfitCenters)
}
