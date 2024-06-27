import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { CostAndProfitCentersViewModel } from '@modules/cost-and-profit-centers/http/view-models/cost-and-profit-centers-view-model'
import { makeCreateCostAndProfitCenterUseCase } from '@modules/cost-and-profit-centers/use-cases/factories/make-create-cost-and-profit-center-factory'

const bodySchema = z.object({
	name: z.string(strMessage('nome do método de pagamento')),
})

export async function createCostAndProfitCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = bodySchema.parse(request.body)

	const createCostAndProfitCenterUseCase =
		makeCreateCostAndProfitCenterUseCase()

	const { center } = await createCostAndProfitCenterUseCase.execute({
		userId: request.user.sub,
		name,
	})

	return reply.status(201).send(CostAndProfitCentersViewModel.toHTTP(center))
}
