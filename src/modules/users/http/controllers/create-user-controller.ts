import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'
import { strMessage } from '@core/utils/custom-zod-error'

import { makeCreateUserUseCase } from '@modules/users/use-cases/factories/make-create-user-factory'

const bodySchema = z.object({
  name: z
    .string(strMessage('nome'))
    .min(1, { message: 'O campo nome é obrigatório.' }),
  document: z
    .string(strMessage('CPF'))
    .length(11, { message: 'O campo CPF deve conter 11 caracteres.' })
    .regex(/^[0-9.\-/]+$/, {
      message: 'O campo CPF deve conter apenas números.',
    }),
  email: z.string(strMessage('e-mail')).email('O campo e-mail é inválido.'),
  phone: z
    .string(strMessage('telefone'))
    .length(14, { message: 'O campo telefone deve conter 14 caracteres.' }),
  birthDate: z.coerce.date(strMessage('data de nascimento')),
  password: z
    .string(strMessage('senha'))
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
      message:
        'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
    }),
})

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, document, email, birthDate, phone, password } =
    bodySchema.parse(request.body)

  const createUserUseCase = makeCreateUserUseCase()

  await createUserUseCase.execute({
    name,
    document: new Document(document, 'CPF').value,
    email: new Email(email).value,
    birthDate,
    phone,
    password,
  })

  return reply.status(200).send()
}
