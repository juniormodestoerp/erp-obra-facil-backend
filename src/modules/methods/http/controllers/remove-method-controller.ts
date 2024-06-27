import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeRemovePaymentMethodUseCase } from '@modules/methods/use-cases/factories/make-remove-method-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador do método de pagamento'))
		.uuid({
			message:
				'O campo identificador do método de pagamento deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador do método de pagamento é obrigatório.'),
})

export async function removePaymentMethodController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const removePaymentMethodUseCase = makeRemovePaymentMethodUseCase()

	await removePaymentMethodUseCase.execute({
		id,
	})

	return reply.status(204).send()
}
