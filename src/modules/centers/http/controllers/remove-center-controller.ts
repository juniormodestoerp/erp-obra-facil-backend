import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeRemoveCostAndProfitCenterUseCase } from '@modules/cost-and-profit-centers/use-cases/factories/make-remove-cost-and-profit-center-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador do método de pagamento'))
		.uuid({
			message:
				'O campo identificador do método de pagamento deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador do método de pagamento é obrigatório.'),
})

export async function removeCostAndProfitCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const removeCostAndProfitCenterUseCase =
		makeRemoveCostAndProfitCenterUseCase()

	await removeCostAndProfitCenterUseCase.execute({
		id,
	})

	return reply.status(204).send()
}
