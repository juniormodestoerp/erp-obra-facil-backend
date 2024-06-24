import type { FastifyReply, FastifyRequest } from 'fastify'

import { PaymentMethodsViewModel } from '@modules/payment-methods/http/view-models/payment-methods-view-model'
import { makeFetchPaymentMethodsUseCase } from '@modules/payment-methods/use-cases/factories/make-fetch-payment-methods-factory'

export async function fetchPaymentMethodsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchPaymentMethodsUseCase = makeFetchPaymentMethodsUseCase()

	const { paymentMethods } = await fetchPaymentMethodsUseCase.execute({
		userId: request.user.sub,
	})

	return reply
		.status(200)
		.send(
			paymentMethods.map(
				(paymentMethod) => PaymentMethodsViewModel.toHTTP(paymentMethod) ?? [],
			),
		)
}
