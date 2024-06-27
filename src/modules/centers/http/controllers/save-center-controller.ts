import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { CostAndProfitCentersViewModel } from '@modules/cost-and-profit-centers/http/view-models/cost-and-profit-centers-view-model'
import { makeSaveCostAndProfitCenterUseCase } from '@modules/cost-and-profit-centers/use-cases/factories/make-save-cost-and-profit-center-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador do método de pagamento'))
		.uuid({
			message:
				'O campo identificador do método de pagamento deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador do método de pagamento é obrigatório.'),
})

const bodySchema = z.object({
	name: z.string(strMessage('nome do método de pagamento')),
})

export async function saveCostAndProfitCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const { name } = bodySchema.parse(request.body)

	const saveCostAndProfitCenterUseCase = makeSaveCostAndProfitCenterUseCase()

	const { center } = await saveCostAndProfitCenterUseCase.execute({
		id,
		userId: request.user.sub,
		name,
	})

	return reply.status(200).send(CostAndProfitCentersViewModel.toHTTP(center))
}
