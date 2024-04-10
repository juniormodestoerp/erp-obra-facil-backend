import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'
import { strMessage } from '@core/utils/custom-zod-error'

import { makeRegisterUseCase } from '@modules/user/use-cases/factories/make-register'
import { UserViewModel } from '@modules/user/http/view-models/user-view-model'

const bodySchema = z.object({
  document: z
    .string(strMessage('CPF'))
    .length(11, { message: 'O campo CPF deve conter 11 caracteres.' })
    .regex(/^[0-9]+$/, {
      message: 'O campo CPF deve conter apenas números.',
    }),
  name: z
    .string(strMessage('nome'))
    .regex(/^[A-Za-z,\s]+$/, {
      message: 'O campo nome deve conter apenas letras.',
    })
    .trim()
    .min(1, { message: 'O campo nome é obrigatório.' })
    .transform((value) => value.replace(/\s+/g, ' ')),
  email: z
    .string(strMessage('e-mail'))
    .email('O campo e-mail é inválido.')
    .min(1, 'O campo e-mail é obrigatório.'),
  phone: z
    .string(strMessage('telefone'))
    .length(14, { message: 'O campo telefone deve conter 14 caracteres.' })
    .refine((value) => value[0] === '+', {
      message: 'O campo telefone deve conter o código do país (+55).',
    }),
  password: z
    .string(strMessage('senha'))
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
      message:
        'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
    }),
})

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, document, email, phone, password } = bodySchema.parse(
    request.body,
  )

  const registerUseCase = makeRegisterUseCase()

  const { user } = await registerUseCase.execute({
    name,
    document: new Document(document, 'CPF'),
    email: new Email(email),
    phone,
    password,
  })

  const accessToken = await reply.jwtSign(
    {
      role: 'USER',
    },
    {
      sign: {
        sub: user.id,
        expiresIn: 60 * 60, // 1 hour
      },
    },
  )

  return reply.status(201).send({
    user: await UserViewModel.toHTTP(user),
    accessToken,
  })
}
