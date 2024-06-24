import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { PaymentMethodsViewModel } from '@modules/payment-methods/http/view-models/payment-methods-view-model'
import { makeSavePaymentMethodUseCase } from '@modules/payment-methods/use-cases/factories/make-save-payment-method-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador do método de pagamento'))
		.uuid({
			message: 'O campo identificador do método de pagamento deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador do método de pagamento é obrigatório.'),
})

const bodySchema = z.object({
	name: z.string(strMessage('nome do método de pagamento')),
})

export async function savePaymentMethodController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const { name } = bodySchema.parse(
		request.body,
	)

	const savePaymentMethodUseCase = makeSavePaymentMethodUseCase()

	const { paymentMethod } = await savePaymentMethodUseCase.execute({
		id,
		userId: request.user.sub,
		name,
	})

	return reply.status(200).send(PaymentMethodsViewModel.toHTTP(paymentMethod))
}
