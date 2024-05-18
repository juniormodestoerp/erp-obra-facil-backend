import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeCreateCategoryUseCase } from '@modules/categories/use-cases/factories/make-create-category-factory'
import { CategoriesViewModel } from '../view-models/categories-view-model'

const bodySchema = z.object({
  categoryId: z.string(strMessage('id da categoria')).optional(),
  categoryName: z.string(strMessage('nome da categoria')),
  categoryDescripion: z.string(strMessage('descrição da categoria')),
})

export async function createCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    categoryId,
    categoryName: name,
    categoryDescripion: description,
  } = bodySchema.parse(request.body)

  const createCategoryUseCase = makeCreateCategoryUseCase()

  const { category } = await createCategoryUseCase.execute({
    userId: request.user.sub,
    categoryId,
    name,
    description,
  })

  return reply.status(201).send(CategoriesViewModel.toHTTP(category))
}
