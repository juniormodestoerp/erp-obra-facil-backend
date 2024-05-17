import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
  boolMessage,
  dateMessage,
  strMessage,
} from '@core/utils/custom-zod-error'

import { CategoryViewModel } from '@modules/categories/http/view-models/category-view-model'
import { makeSaveCategoryUseCase } from '@modules/categories/use-cases/factories/make-save-category'

const paramsSchema = z.object({
  id: z
    .string(strMessage('id das configurações'))
    .uuid({ message: 'O campo id das configurações deve ser um UUID válido.' })
    .min(1, 'O campo id das configurações é obrigatório.')
    .optional(),
})

const bodySchema = z.object({
  fieldName: z.string(strMessage('nome do campo')),
  isFieldEnable: z.boolean(boolMessage('campo habilitado')),
  isFieldRequired: z.boolean(boolMessage('campo obrigatório')),
  title: z.string(strMessage('título')),
  description: z.string(strMessage('descrição')),
  createdAt: z.coerce.date(dateMessage('data de criação')),
})

export async function saveCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)
  const { fieldName, isFieldEnable, isFieldRequired, title, description } =
    bodySchema.parse(request.body)

  const saveCategoryUseCase = makeSaveCategoryUseCase()

  const { category } = await saveCategoryUseCase.execute({
    id,
    userId: 'eb15bdac-beec-4a37-b749-5a05b7fbc10c',
    fieldName,
    isFieldEnable,
    isFieldRequired,
    title,
    description,
  })

  return reply.status(201).send(CategoryViewModel.toHTTP(category))
}
