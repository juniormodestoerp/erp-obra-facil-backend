import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSelectInputCategoriesUseCase } from '@modules/categories/use-cases/factories/make-fetch-select-input-categories-factory'

export async function fetchSelectInputCategoriesController(
	_: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchSelectInputCategoriesUseCase =
		makeFetchSelectInputCategoriesUseCase()

	const { categories } = await fetchSelectInputCategoriesUseCase.execute()

	return reply.status(200).send(categories)
}
