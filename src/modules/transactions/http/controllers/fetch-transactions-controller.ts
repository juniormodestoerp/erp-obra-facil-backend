import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { numbMessage, strMessage } from '@core/utils/custom-zod-error'

import { TransactionViewModel } from '@modules/transactions/http/view-models/transaction-view-model'
import { makeFetchTransactionsUseCase } from '@modules/transactions/use-cases/factories/make-fetch-transactions-factory'

import { env } from '@shared/infra/config/env'

// const querySchema = z.object({
// 	pageIndex: z.coerce
// 		.number(numbMessage('índice da página'))
// 		.int({ message: 'O índice da página deve ser um número inteiro.' })
// 		.default(1),
// 	searchTerm: z.string(strMessage('termo de busca')).optional(),
// })

export async function fetchTransactions(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	// const { pageIndex, searchTerm } = querySchema.parse(request.query)

	const fetchTransactionsUseCase = makeFetchTransactionsUseCase()

	const { transactions } = await fetchTransactionsUseCase.execute({
		userId: request.user.sub,
	})
	// 	{
	// 	// pageIndex,
	// 	// userId: request.user.sub,
	// 	// searchTerm,
	// }

	return reply
		.status(200)
		.send(
			transactions.map((transaction) =>
				TransactionViewModel.toHTTP(transaction),
			),
		)
	// meta: {
	// 	pageIndex,
	// 	perPage: env.PER_PAGE,
	// 	totalCount,
	// },
}
