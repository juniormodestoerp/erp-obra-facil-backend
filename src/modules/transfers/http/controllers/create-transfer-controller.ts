import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { TransfersViewModel } from '@modules/transfers/http/view-models/transfers-view-model'
import { makeCreateTransferUseCase } from '@modules/transfers/use-cases/factories/make-create-transfer-factory'

const bodySchema = z.object({
	name: z.string(strMessage('nome da transferência')),
})

export async function createTransferController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = bodySchema.parse(
		request.body,
	)

	const createTransferUseCase = makeCreateTransferUseCase()

	const { transfer } = await createTransferUseCase.execute({
		name,
	})

	return reply.status(201).send(TransfersViewModel.toHTTP(transfer))
}
