import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeCreateCategoryUseCase } from '@modules/categories/use-cases/factories/make-create-category-factory'
import { CategoriesViewModel } from '../view-models/categories-view-model'

const bodySchema = z.object({
  categoryId: z.string(strMessage('id da categoria')).optional(),
  categoryName: z.string(strMessage('nome da categoria')),
  subcategoryName: z.string(strMessage('nome da subcategoria')).optional(),
  model: z.string(strMessage('modelo')),
  type: z.string(strMessage('tipo')),
})

export async function createCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    categoryId,
    categoryName: name,
    subcategoryName: subcategory,
    model,
    type,
  } = bodySchema.parse(request.body)

  const createCategoryUseCase = makeCreateCategoryUseCase()

  const { category } = await createCategoryUseCase.execute({
    userId: request.user.sub,
    categoryId,
    name,
    subcategory,
    model,
    type,
  })

  return reply.status(201).send(CategoriesViewModel.toHTTP(category))
}
