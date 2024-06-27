import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { CentersViewModel } from '@modules/centers/http/view-models/centers-view-model'
import { makeShowCostAndProfitCenterUseCase } from '@modules/centers/use-cases/factories/make-show-center-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador do método de pagamento'))
		.uuid({
			message:
				'O campo identificador do método de pagamento deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador do método de pagamento é obrigatório.'),
})

export async function showCostAndProfitCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const showCostAndProfitCenterUseCase = makeShowCostAndProfitCenterUseCase()

	const { center } = await showCostAndProfitCenterUseCase.execute({
		id,
	})

	return reply.status(200).send(CentersViewModel.toHTTP(center))
}
