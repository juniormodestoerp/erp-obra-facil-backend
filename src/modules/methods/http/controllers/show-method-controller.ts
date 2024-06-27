import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { MethodsViewModel } from '@modules/methods/http/view-models/methods-view-model'
import { makeShowMethodUseCase } from '@modules/methods/use-cases/factories/make-show-method-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador do método de pagamento'))
		.uuid({
			message:
				'O campo identificador do método de pagamento deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador do método de pagamento é obrigatório.'),
})

export async function showMethodController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const showMethodUseCase = makeShowMethodUseCase()

	const { method } = await showMethodUseCase.execute({
		id,
	})

	return reply.status(200).send(MethodsViewModel.toHTTP(method))
}
