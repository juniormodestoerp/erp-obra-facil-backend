import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSelectInputMethodsUseCase } from '@modules/methods/use-cases/factories/make-fetch-select-input-methods-factory'

export async function fetchSelectInputMethodsController(
	_: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchSelectInputMethodsUseCase = makeFetchSelectInputMethodsUseCase()

	const { paymentMethods } = await fetchSelectInputMethodsUseCase.execute()

	return reply.status(200).send(paymentMethods)
}
