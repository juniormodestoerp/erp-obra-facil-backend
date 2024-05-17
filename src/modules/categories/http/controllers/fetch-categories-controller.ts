import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { numbMessage } from '@core/utils/custom-zod-error'

import { makeFetchCategoriesUseCase } from '@modules/categories/use-cases/factories/make-fetch-categories'
import { CategoryViewModel } from '@modules/categories/http/view-models/category-view-model'

import { env } from '@shared/infra/config/env'

const querySchema = z.object({
  pageIndex: z.coerce
    .number(numbMessage('índice da página'))
    .int({ message: 'O índice da página deve ser um número inteiro.' })
    .default(1),
})

export async function fetchCategories(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { pageIndex } = querySchema.parse(request.query)

  const fetchCategoriesUseCase = makeFetchCategoriesUseCase()

  const { categories, totalCount } = await fetchCategoriesUseCase.execute({
    pageIndex,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    categories: categories.map(
      (category) => CategoryViewModel.toHTTP(category) ?? [],
    ),
    meta: {
      pageIndex,
      perPage: env.PER_PAGE,
      totalCount,
    },
  })
}
