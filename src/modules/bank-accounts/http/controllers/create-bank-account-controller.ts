import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { numbMessage, strMessage } from '@core/utils/custom-zod-error'

import { BankAccountsViewModel } from '@modules/bank-accounts/http/view-models/bank-accounts-view-model'
import { makeCreateBankAccountUseCase } from '@modules/bank-accounts/use-cases/factories/make-create-bank-account-factory'

const bodySchema = z.object({
	name: z.string(strMessage('nome da conta')),
	currency: z.string(strMessage('moeada da conta')),
	logo: z.string(strMessage('logo da conta')),
	initialBalance: z.number(numbMessage('saldo inicial')),
})

export async function createBankAccountController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name, currency, logo, initialBalance } = bodySchema.parse(
		request.body,
	)

	const createBankAccountUseCase = makeCreateBankAccountUseCase()

	const { bankAccount } = await createBankAccountUseCase.execute({
		userId: request.user.sub,
		name,
		currency,
		logo,
		initialBalance,
	})

	return reply.status(201).send(BankAccountsViewModel.toHTTP(bankAccount))
}
