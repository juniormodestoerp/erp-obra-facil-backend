import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeRemoveSettingUseCase } from '@modules/settings/use-cases/factories/make-remove-setting'

const paramsSchema = z.object({
  id: z
    .string(strMessage('id das configurações'))
    .uuid({ message: 'O campo id das configurações deve ser um UUID válido.' })
    .min(1, 'O campo id das configurações é obrigatório.'),
})

export async function removeSetting(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const removeSettingUseCase = makeRemoveSettingUseCase()

  await removeSettingUseCase.execute({
    id,
    userId: 'eb15bdac-beec-4a37-b749-5a05b7fbc10c',
  })

  return reply.status(204).send()
}
