import type { FastifyReply, FastifyRequest } from 'fastify'

import { BankAccountsViewModel } from '@modules/accounts/http/view-models/bank-accounts-view-model'
import { makeFetchBankAccountsUseCase } from '@modules/accounts/use-cases/factories/make-fetch-bank-accounts-factory'

export async function fetchBankAccountsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchBankAccountsUseCase = makeFetchBankAccountsUseCase()

	const { bankAccounts } = await fetchBankAccountsUseCase.execute({
		userId: request.user.sub,
	})

	console.log(
		'bankAccounts',
		bankAccounts.map((account) => BankAccountsViewModel.toHTTP(account) ?? []),
	)

	return reply
		.status(200)
		.send(
			bankAccounts.map(
				(account) => BankAccountsViewModel.toHTTP(account) ?? [],
			),
		)
}
