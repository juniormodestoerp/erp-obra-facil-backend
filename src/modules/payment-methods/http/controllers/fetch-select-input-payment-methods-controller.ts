import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSelectInputPaymentMethodsUseCase } from '@modules/payment-methods/use-cases/factories/make-fetch-select-input-payment-methods-factory'

export async function fetchSelectInputPaymentMethodsController(
	_: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchSelectInputPaymentMethodsUseCase =
		makeFetchSelectInputPaymentMethodsUseCase()

	const { paymentMethods } = await fetchSelectInputPaymentMethodsUseCase.execute()

	return reply.status(200).send(paymentMethods)
}
