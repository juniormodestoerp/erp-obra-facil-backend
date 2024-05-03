import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeRemoveUserUseCase } from '@modules/users/use-cases/factories/make-remove-user-factory'

const paramsSchema = z.object({
  id: z
    .string(strMessage('identificador do usuário'))
    .uuid('O campo identificador do usuário deve ser um UUID válido.'),
})

export async function removeUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const removeUserUseCase = makeRemoveUserUseCase()

  await removeUserUseCase.execute({
    userId: id,
  })

  return reply.status(200).send()
}
