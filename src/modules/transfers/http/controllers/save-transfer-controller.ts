import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { numbMessage, strMessage } from '@core/utils/custom-zod-error'

import { TransfersViewModel } from '@modules/transfers/http/view-models/transfers-view-model'
import { makeSaveTransferUseCase } from '@modules/transfers/use-cases/factories/make-save-transfer-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da transferência'))
		.uuid({
			message: 'O campo identificador da transferência deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da transferência é obrigatório.'),
})

const bodySchema = z.object({
	name: z.string(strMessage('nome da transferência')),
})

export async function saveTransferController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const { name } = bodySchema.parse(
		request.body,
	)

	const saveTransferUseCase = makeSaveTransferUseCase()

	const { transfer } = await saveTransferUseCase.execute({
		id,
		userId: request.user.sub,
		name,
	})

	return reply.status(200).send(TransfersViewModel.toHTTP(transfer))
}
