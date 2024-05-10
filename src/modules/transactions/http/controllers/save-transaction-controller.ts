import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeSaveTransactionUseCase } from '@modules/transactions/use-cases/factories/make-save-transaction-factory'

const paramsSchema = z.object({
  id: z
    .string(strMessage('id das configurações'))
    .uuid({ message: 'O campo id das configurações deve ser um UUID válido.' })
    .min(1, 'O campo id das configurações é obrigatório.')
    .optional(),
})

const bodySchema = z.object({
  name: z.string(strMessage('nome')),
  description: z.string(strMessage('descrição')),
  transactionId: z.string(strMessage('id do lançamento')).optional(),
})

export async function saveTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)
  const { name, description, transactionId } = bodySchema.parse(request.body)

  const saveTransactionUseCase = makeSaveTransactionUseCase()

  await saveTransactionUseCase.execute({
    id,
    userId: request.user.sub,
    transactionId,
    name,
    description,
  })

  return reply.status(201).send()
}
