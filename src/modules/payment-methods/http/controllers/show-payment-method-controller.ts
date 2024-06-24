import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { PaymentMethodsViewModel } from '@modules/payment-methods/http/view-models/payment-methods-view-model'
import { makeShowPaymentMethodUseCase } from '@modules/payment-methods/use-cases/factories/make-show-payment-method-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador do método de pagamento'))
		.uuid({
			message: 'O campo identificador do método de pagamento deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador do método de pagamento é obrigatório.'),
})

export async function showPaymentMethodController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const showPaymentMethodUseCase = makeShowPaymentMethodUseCase()

	const { paymentMethod } = await showPaymentMethodUseCase.execute({
		id,
	})

	return reply.status(200).send(PaymentMethodsViewModel.toHTTP(paymentMethod))
}
