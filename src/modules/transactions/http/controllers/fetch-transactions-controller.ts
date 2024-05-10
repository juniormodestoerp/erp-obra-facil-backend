import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { numbMessage } from '@core/utils/custom-zod-error'

import { makeFetchTransactionsUseCase } from '@modules/transactions/use-cases/factories/make-fetch-transactions-factory'
import { TransactionViewModel } from '@modules/transactions/http/view-models/transaction-view-model'

import { env } from '@shared/infra/config/env'

const querySchema = z.object({
  pageIndex: z.coerce
    .number(numbMessage('índice da página'))
    .int({ message: 'O índice da página deve ser um número inteiro.' })
    .default(1),
})

export async function fetchTransactions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { pageIndex } = querySchema.parse(request.query)

  const fetchTransactionsUseCase = makeFetchTransactionsUseCase()

  const { transactions, totalCount } = await fetchTransactionsUseCase.execute({
    pageIndex,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    transactions: transactions.map(
      (transaction) => TransactionViewModel.toHTTP(transaction) ?? [],
    ),
    meta: {
      pageIndex,
      perPage: env.PER_PAGE,
      totalCount,
    },
  })
}
