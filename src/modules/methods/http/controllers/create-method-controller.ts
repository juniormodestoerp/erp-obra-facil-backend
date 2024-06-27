import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { PaymentMethodsViewModel } from '@modules/methods/http/view-models/methods-view-model'
import { makeCreatePaymentMethodUseCase } from '@modules/methods/use-cases/factories/make-create-method-factory'

const bodySchema = z.object({
	name: z.string(strMessage('nome do método de pagamento')),
})

export async function createPaymentMethodController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = bodySchema.parse(request.body)

	const createPaymentMethodUseCase = makeCreatePaymentMethodUseCase()

	const { method } = await createPaymentMethodUseCase.execute({
		userId: request.user.sub,
		name,
	})

	return reply.status(201).send(PaymentMethodsViewModel.toHTTP(method))
}
