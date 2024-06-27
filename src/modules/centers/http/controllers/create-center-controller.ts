import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { CentersViewModel } from '@modules/centers/http/view-models/centers-view-model'
import { makeCreateCenterUseCase } from '@modules/centers/use-cases/factories/make-create-center-factory'

const bodySchema = z.object({
	name: z.string(strMessage('nome do método de pagamento')),
})

export async function createCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = bodySchema.parse(request.body)

	const createCenterUseCase = makeCreateCenterUseCase()

	const { center } = await createCenterUseCase.execute({
		userId: request.user.sub,
		name,
	})

	return reply.status(201).send(CentersViewModel.toHTTP(center))
}
