import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { BankAccountsViewModel } from '@modules/accounts/http/view-models/bank-accounts-view-model'
import { makeShowBankAccountUseCase } from '@modules/accounts/use-cases/factories/make-show-bank-account-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da conta'))
		.uuid({
			message: 'O campo identificador da conta deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da conta é obrigatório.'),
})

export async function showBankAccountController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const showBankAccountUseCase = makeShowBankAccountUseCase()

	const { account } = await showBankAccountUseCase.execute({
		id,
	})

	return reply.status(200).send(BankAccountsViewModel.toHTTP(account))
}
