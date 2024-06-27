import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { CentersViewModel } from '@modules/centers/http/view-models/centers-view-model'
import { makeSaveCenterUseCase } from '@modules/centers/use-cases/factories/make-save-center-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador do método de pagamento'))
		.uuid({
			message:
				'O campo identificador do método de pagamento deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador do método de pagamento é obrigatório.'),
})

const bodySchema = z.object({
	name: z.string(strMessage('nome do método de pagamento')),
})

export async function saveCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const { name } = bodySchema.parse(request.body)

	const saveCenterUseCase = makeSaveCenterUseCase()

	const { center } = await saveCenterUseCase.execute({
		id,
		userId: request.user.sub,
		name,
	})

	return reply.status(200).send(CentersViewModel.toHTTP(center))
}
