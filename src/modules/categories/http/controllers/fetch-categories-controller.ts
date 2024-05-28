import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { numbMessage } from '@core/utils/custom-zod-error'

import { CategoriesViewModel } from '@modules/categories/http/view-models/categories-view-model'
import { makeFetchCategoriesUseCase } from '@modules/categories/use-cases/factories/make-fetch-categories-factory'

import { env } from '@shared/infra/config/env'

const querySchema = z.object({
	pageIndex: z.coerce
		.number(numbMessage('índice da página'))
		.int({ message: 'O índice da página deve ser um número inteiro.' })
		.default(1),
})

export async function fetchCategoriesController(
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
			(category) => CategoriesViewModel.toHTTP(category) ?? [],
		),
		meta: {
			pageIndex,
			perPage: env.PER_PAGE,
			totalCount,
		},
	})
}
