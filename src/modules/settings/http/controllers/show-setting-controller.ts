import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeShowSettingUseCase } from '@modules/settings/use-cases/factories/make-show-setting-factory'
import { SettingViewModel } from '../view-models/setting-view-model'

const paramsSchema = z.object({
  id: z
    .string(strMessage('id das configurações'))
    .uuid({ message: 'O campo id das configurações deve ser um UUID válido.' })
    .min(1, 'O campo id das configurações é obrigatório.'),
})

export async function showSetting(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const showSettingUseCase = makeShowSettingUseCase()

  const { setting } = await showSettingUseCase.execute({
    userId: request.user.sub,
    id,
  })

  return reply.status(204).send(SettingViewModel.toHTTP(setting))
}
