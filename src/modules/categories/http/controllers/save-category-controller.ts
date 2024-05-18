import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeSaveCategoryUseCase } from '@modules/categories/use-cases/factories/make-save-category-factory'
import { CategoriesViewModel } from '@modules/categories/http/view-models/categories-view-model'

const paramsSchema = z.object({
  id: z
    .string(strMessage('id das configurações'))
    .uuid({ message: 'O campo id das configurações deve ser um UUID válido.' })
    .min(1, 'O campo id das configurações é obrigatório.'),
})

const bodySchema = z.object({
  categoryId: z.string(strMessage('id da categoria')).optional(),
  categoryName: z.string(strMessage('nome da categoria')),
  categoryDescripion: z.string(strMessage('descrição da categoria')),
})

export async function saveCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const {
    categoryId,
    categoryName: name,
    categoryDescripion: description,
  } = bodySchema.parse(request.body)

  const saveCategoryUseCase = makeSaveCategoryUseCase()

  const { category } = await saveCategoryUseCase.execute({
    id,
    userId: request.user.sub,
    categoryId,
    name,
    description,
  })

  return reply.status(200).send(CategoriesViewModel.toHTTP(category))
}
