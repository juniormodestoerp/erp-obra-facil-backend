import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { CategoryType } from '@modules/categories/entities/category'
import { CategoriesViewModel } from '@modules/categories/http/view-models/categories-view-model'
import { makeSaveCategoryUseCase } from '@modules/categories/use-cases/factories/make-save-category-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da categoria'))
		.uuid({
			message: 'O campo identificador da categoria deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da categoria é obrigatório.'),
})

const bodySchema = z.object({
	type: z.string(strMessage('tipo da categoria')),
	name: z.string(strMessage('nome da categoria')),
	subcategoryOf: z.string(strMessage('subcategoria da categoria')).nullable(),
})

export async function saveCategoryController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const { type, name, subcategoryOf } = bodySchema.parse(request.body)

	const saveCategoryUseCase = makeSaveCategoryUseCase()

	const { category } = await saveCategoryUseCase.execute({
		id,
		userId: request.user.sub,
		type: CategoryType[type as keyof typeof CategoryType],
		name,
		subcategoryOf,
	})

	return reply.status(200).send(CategoriesViewModel.toHTTP(category))
}
