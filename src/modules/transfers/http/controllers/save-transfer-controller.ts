import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { numbMessage, strMessage } from '@core/utils/custom-zod-error'

import { TransfersViewModel } from '@modules/transfers/http/view-models/transfers-view-model'
import { makeSaveTransferUseCase } from '@modules/transfers/use-cases/factories/make-save-transfer-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da conta'))
		.uuid({
			message: 'O campo identificador da conta deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da conta é obrigatório.'),
})

const bodySchema = z.object({
	name: z.string(strMessage('nome da conta')),
	currency: z.string(strMessage('moeada da conta')),
	logo: z.string(strMessage('logo da conta')),
	initialBalance: z.number(numbMessage('saldo inicial')),
})

export async function saveTransferController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const { name, currency, logo, initialBalance } = bodySchema.parse(
		request.body,
	)

	const saveTransferUseCase = makeSaveTransferUseCase()

	const { transfer } = await saveTransferUseCase.execute({
		id,
		userId: request.user.sub,
		name,
		currency,
		logo,
		initialBalance,
	})

	return reply.status(200).send(TransfersViewModel.toHTTP(transfer))
}
