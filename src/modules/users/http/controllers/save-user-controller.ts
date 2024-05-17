import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Email } from '@core/domain/entities/value-object/email'
import { strMessage } from '@core/utils/custom-zod-error'

import { makeSaveUserUseCase } from '@modules/users/use-cases/factories/make-save-user-factory'

const paramsSchema = z.object({
  id: z
    .string(strMessage('identificador do usuário'))
    .uuid('O campo identificador do usuário deve ser um UUID válido.')
    .optional(),
})

const bodySchema = z.object({
  name: z
    .string(strMessage('nome'))
    .min(1, { message: 'O campo nome é obrigatório.' }),
  email: z.string(strMessage('e-mail')).email('O campo e-mail é inválido.'),
  phone: z
    .string(strMessage('telefone'))
    .length(14, { message: 'O campo telefone deve conter 14 caracteres.' }),
})

export async function saveUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)
  const { name, email, phone } = bodySchema.parse(request.body)

  const saveUserUseCase = makeSaveUserUseCase()

  await saveUserUseCase.execute({
    id: id ?? request?.user?.sub ?? undefined,
    name,
    email: new Email(email).value,
    phone,
  })

  return reply.status(200).send()
}
