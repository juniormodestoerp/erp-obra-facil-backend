import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeRemoveBankAccountUseCase } from '@modules/accounts/use-cases/factories/make-remove-bank-account-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da conta'))
		.uuid({
			message: 'O campo identificador da conta deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da conta é obrigatório.'),
})

export async function removeBankAccountController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const removeBankAccountUseCase = makeRemoveBankAccountUseCase()

	await removeBankAccountUseCase.execute({
		id,
	})

	return reply.status(204).send()
}
