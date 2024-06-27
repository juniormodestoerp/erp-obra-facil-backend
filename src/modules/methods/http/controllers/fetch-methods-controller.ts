import type { FastifyReply, FastifyRequest } from 'fastify'

import { MethodsViewModel } from '@modules/methods/http/view-models/methods-view-model'
import { makeFetchMethodsUseCase } from '@modules/methods/use-cases/factories/make-fetch-methods-factory'

export async function fetchMethodsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchMethodsUseCase = makeFetchMethodsUseCase()

	const { paymentMethods } = await fetchMethodsUseCase.execute({
		userId: request.user.sub,
	})

	return reply
		.status(200)
		.send(paymentMethods.map((method) => MethodsViewModel.toHTTP(method) ?? []))
}
