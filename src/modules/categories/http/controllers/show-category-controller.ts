import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { CategoriesViewModel } from '@modules/categories/http/view-models/categories-view-model'
import { makeShowCategoryUseCase } from '@modules/categories/use-cases/factories/make-show-category-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da categoria'))
		.uuid({
			message: 'O campo identificador da categoria deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da categoria é obrigatório.'),
})

export async function showCategoryController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const showCategoryUseCase = makeShowCategoryUseCase()

	const { category } = await showCategoryUseCase.execute({
		id,
	})

	return reply.status(200).send(CategoriesViewModel.toHTTP(category))
}
