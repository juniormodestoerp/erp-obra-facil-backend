import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeShowCategoryUseCase } from '@modules/categories/use-cases/factories/make-show-category-factory'

const paramsSchema = z.object({
  id: z
    .string(strMessage('id das configurações'))
    .uuid({ message: 'O campo id das configurações deve ser um UUID válido.' })
    .min(1, 'O campo id das configurações é obrigatório.'),
})

export async function showCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const showCategoryUseCase = makeShowCategoryUseCase()

  await showCategoryUseCase.execute({
    userId: request.user.sub,
    id,
  })

  return reply.status(204).send()
}
