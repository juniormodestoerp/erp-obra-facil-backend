import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { MethodsViewModel } from '@modules/methods/http/view-models/methods-view-model'
import { makeCreateMethodUseCase } from '@modules/methods/use-cases/factories/make-create-method-factory'

const bodySchema = z.object({
	name: z.string(strMessage('nome do método de pagamento')),
})

export async function createMethodController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = bodySchema.parse(request.body)

	const createMethodUseCase = makeCreateMethodUseCase()

	const { method } = await createMethodUseCase.execute({
		userId: request.user.sub,
		name,
	})

	return reply.status(201).send(MethodsViewModel.toHTTP(method))
}
