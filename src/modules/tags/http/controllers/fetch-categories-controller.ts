import type { FastifyReply, FastifyRequest } from 'fastify'

import { CategoriesViewModel } from '@modules/categories/http/view-models/categories-view-model'
import { makeFetchCategoriesUseCase } from '@modules/categories/use-cases/factories/make-fetch-categories-factory'

export async function fetchCategoriesController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchCategoriesUseCase = makeFetchCategoriesUseCase()

	const { categories } = await fetchCategoriesUseCase.execute({
		userId: request.user.sub,
	})

	return reply
		.status(200)
		.send(
			categories.map((category) => CategoriesViewModel.toHTTP(category) ?? []),
		)
}
