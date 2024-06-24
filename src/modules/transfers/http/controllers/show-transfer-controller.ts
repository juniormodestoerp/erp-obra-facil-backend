import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { TransfersViewModel } from '@modules/transfers/http/view-models/transfers-view-model'
import { makeShowTransferUseCase } from '@modules/transfers/use-cases/factories/make-show-transfer-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da transferência'))
		.uuid({
			message: 'O campo identificador da transferência deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da transferência é obrigatório.'),
})

export async function showTransferController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const showTransferUseCase = makeShowTransferUseCase()

	const { transfer } = await showTransferUseCase.execute({
		id,
	})

	return reply.status(200).send(TransfersViewModel.toHTTP(transfer))
}
