import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSelectInputAccountsUseCase } from '@modules/accounts/use-cases/factories/make-fetch-select-input-accounts-factory'

export async function fetchSelectInputAccountsController(
	_: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchSelectInputAccountsUseCase = makeFetchSelectInputAccountsUseCase()

	const { bankAccounts } = await fetchSelectInputAccountsUseCase.execute()

	return reply.status(200).send(bankAccounts)
}
