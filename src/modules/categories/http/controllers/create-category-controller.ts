import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { CategoryType } from '@modules/categories/entities/category'
import { makeCreateCategoryUseCase } from '@modules/categories/use-cases/factories/make-create-category-factory'
import { CategoriesViewModel } from '../view-models/categories-view-model'

const bodySchema = z.object({
	type: z.string(strMessage('tipo da categoria')),
	name: z.string(strMessage('nome da categoria')),
	subcategoryOf: z.string(strMessage('subcategoria da categoria')).nullable(),
})

export async function createCategoryController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { type, name, subcategoryOf } = bodySchema.parse(request.body)

	const createCategoryUseCase = makeCreateCategoryUseCase()

	const { category } = await createCategoryUseCase.execute({
		userId: request.user.sub,
		type: CategoryType[type as keyof typeof CategoryType],
		name,
		subcategoryOf,
	})

	return reply.status(201).send(CategoriesViewModel.toHTTP(category))
}
