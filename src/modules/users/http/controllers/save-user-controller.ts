import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'
import { strMessage } from '@core/utils/custom-zod-error'

import { UserRole } from '@modules/users/entities/user'
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
  document: z
    .string(strMessage('CPF'))
    .length(11, { message: 'O campo CPF deve conter 11 caracteres.' })
    .regex(/^[0-9.\-/]+$/, {
      message: 'O campo CPF deve conter apenas números.',
    }),
  birthDate: z.coerce.date(strMessage('data de nascimento')),
  email: z.string(strMessage('e-mail')).email('O campo e-mail é inválido.'),
  phone: z
    .string(strMessage('telefone'))
    .length(14, { message: 'O campo telefone deve conter 14 caracteres.' }),
  password: z
    .string(strMessage('senha'))
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
      message:
        'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
    }),
  role: z
    .nativeEnum(UserRole, {
      required_error: 'O campo função é obrigatório.',
    })
    .optional(),
  status: z
    .string(strMessage('status'))
    .min(1, { message: 'O campo status é obrigatório.' })
    .optional(),
})

export async function saveUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)
  const { name, document, email, birthDate, phone, password, role, status } =
    bodySchema.parse(request.body)

  const saveUserUseCase = makeSaveUserUseCase()

  await saveUserUseCase.execute({
    id: id ?? request?.user?.sub ?? undefined,
    name,
    document: new Document(document, 'CPF'),
    email: new Email(email),
    birthDate,
    phone,
    password,
    role,
    status,
  })

  return reply.status(200).send()
}
