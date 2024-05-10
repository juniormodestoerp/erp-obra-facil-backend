import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeRemoveTransactionUseCase } from '@modules/transactions/use-cases/factories/make-remove-transaction-factory'

const paramsSchema = z.object({
  id: z
    .string(strMessage('id das configurações'))
    .uuid({ message: 'O campo id das configurações deve ser um UUID válido.' })
    .min(1, 'O campo id das configurações é obrigatório.'),
})

export async function removeTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const removeTransactionUseCase = makeRemoveTransactionUseCase()

  await removeTransactionUseCase.execute({
    id,
    userId: request.user.sub,
  })

  return reply.status(204).send()
}
