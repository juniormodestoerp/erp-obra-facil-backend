import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSelectInputBankAccountsUseCase } from '@modules/accounts/use-cases/factories/make-fetch-select-input-bank-accounts-factory'

export async function fetchSelectInputBankAccountsController(
	_: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchSelectInputBankAccountsUseCase =
		makeFetchSelectInputBankAccountsUseCase()

	const { bankAccounts } = await fetchSelectInputBankAccountsUseCase.execute()

	return reply.status(200).send(bankAccounts)
}
