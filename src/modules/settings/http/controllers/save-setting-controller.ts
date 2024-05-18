import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
  boolMessage,
  dateMessage,
  strMessage,
} from '@core/utils/custom-zod-error'

import { makeSaveSettingUseCase } from '@modules/settings/use-cases/factories/make-save-setting-factory'
import { SettingViewModel } from '@modules/settings/http/view-models/setting-view-model'

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

export async function saveSetting(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const { fieldName, isFieldEnable, isFieldRequired, title, description } =
    bodySchema.parse(request.body)

  const saveSettingUseCase = makeSaveSettingUseCase()

  const { setting } = await saveSettingUseCase.execute({
    id,
    userId: request.user.sub,
    fieldName,
    isFieldEnable,
    isFieldRequired,
    title,
    description,
  })

  return reply.status(201).send(SettingViewModel.toHTTP(setting))
}
