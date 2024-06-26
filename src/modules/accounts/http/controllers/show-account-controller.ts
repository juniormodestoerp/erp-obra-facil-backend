import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { AccountsViewModel } from '@modules/accounts/http/view-models/accounts-view-model'
import { makeShowAccountUseCase } from '@modules/accounts/use-cases/factories/make-show-account-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da conta'))
		.uuid({
			message: 'O campo identificador da conta deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da conta é obrigatório.'),
})

export async function showAccountController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const showAccountUseCase = makeShowAccountUseCase()

	const { account } = await showAccountUseCase.execute({
		id,
	})

	return reply.status(200).send(AccountsViewModel.toHTTP(account))
}
