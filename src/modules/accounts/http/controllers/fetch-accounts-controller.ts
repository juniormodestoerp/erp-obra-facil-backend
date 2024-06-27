import type { FastifyReply, FastifyRequest } from 'fastify'

import { AccountsViewModel } from '@modules/accounts/http/view-models/accounts-view-model'
import { makeFetchAccountsUseCase } from '@modules/accounts/use-cases/factories/make-fetch-accounts-factory'

export async function fetchAccountsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchAccountsUseCase = makeFetchAccountsUseCase()

	const { bankAccounts } = await fetchAccountsUseCase.execute({
		userId: request.user.sub,
	})

	console.log(
		'bankAccounts',
		bankAccounts.map((account) => AccountsViewModel.toHTTP(account) ?? []),
	)

	return reply
		.status(200)
		.send(
			bankAccounts.map((account) => AccountsViewModel.toHTTP(account) ?? []),
		)
}
