import type { FastifyReply, FastifyRequest } from 'fastify'

import { CostAndProfitCentersViewModel } from '@modules/cost-and-profit-centers/http/view-models/cost-and-profit-centers-view-model'
import { makeFetchCostAndProfitCentersUseCase } from '@modules/cost-and-profit-centers/use-cases/factories/make-fetch-cost-and-profit-centers-factory'

export async function fetchCostAndProfitCentersController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchCostAndProfitCentersUseCase = makeFetchCostAndProfitCentersUseCase()

	const { costAndProfitCenters } = await fetchCostAndProfitCentersUseCase.execute({
		userId: request.user.sub,
	})

	return reply
		.status(200)
		.send(
			costAndProfitCenters.map(
				(costAndProfitCenter) => CostAndProfitCentersViewModel.toHTTP(costAndProfitCenter) ?? [],
			),
		)
}
