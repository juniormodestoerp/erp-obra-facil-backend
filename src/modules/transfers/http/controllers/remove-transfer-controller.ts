import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeRemoveTransferUseCase } from '@modules/transfers/use-cases/factories/make-remove-transfer-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da conta'))
		.uuid({
			message: 'O campo identificador da conta deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da conta é obrigatório.'),
})

export async function removeTransferController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const removeTransferUseCase = makeRemoveTransferUseCase()

	await removeTransferUseCase.execute({
		id,
	})

	return reply.status(204).send()
}
