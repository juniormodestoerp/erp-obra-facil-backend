import type { FastifyReply, FastifyRequest } from 'fastify'

import { PaymentMethodsViewModel } from '@modules/methods/http/view-models/methods-view-model'
import { makeFetchPaymentMethodsUseCase } from '@modules/methods/use-cases/factories/make-fetch-methods-factory'

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
				(method) => PaymentMethodsViewModel.toHTTP(method) ?? [],
			),
		)
}
