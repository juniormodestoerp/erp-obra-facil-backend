import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { MethodsViewModel } from '@modules/methods/http/view-models/methods-view-model'
import { makeSaveMethodUseCase } from '@modules/methods/use-cases/factories/make-save-method-factory'

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

export async function saveMethodController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const { name } = bodySchema.parse(request.body)

	const saveMethodUseCase = makeSaveMethodUseCase()

	const { method } = await saveMethodUseCase.execute({
		id,
		userId: request.user.sub,
		name,
	})

	return reply.status(200).send(MethodsViewModel.toHTTP(method))
}
