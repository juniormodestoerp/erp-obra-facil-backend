import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { numbMessage, strMessage } from '@core/utils/custom-zod-error'

import { BankAccountsViewModel } from '@modules/bank-accounts/http/view-models/bank-accounts-view-model'
import { makeSaveBankAccountUseCase } from '@modules/bank-accounts/use-cases/factories/make-save-bank-account-factory'

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

export async function saveBankAccountController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const { name, currency, logo, initialBalance } = bodySchema.parse(
		request.body,
	)

	const saveBankAccountUseCase = makeSaveBankAccountUseCase()

	const { bankAccount } = await saveBankAccountUseCase.execute({
		id,
		userId: request.user.sub,
		name,
		currency,
		logo,
		initialBalance,
	})

	return reply.status(200).send(BankAccountsViewModel.toHTTP(bankAccount))
}
