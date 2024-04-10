import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeResetForgotPasswordUseCase } from '@modules/user/use-cases/factories/make-reset-forgot-password'

import { strMessage } from '@core/utils/custom-zod-error'

const bodySchema = z.object({
  token: z
    .string(strMessage('token'))
    .uuid({ message: 'O token deve ser um UUID válido.' })
    .min(1, { message: 'O token é obrigatório.' }),
  code: z
    .string(strMessage('código'))
    .length(6, { message: 'O código deve ter 6 dígitos.' })
    .regex(/^[0-9]+$/, { message: 'O código deve conter apenas números.' })
    .min(1, { message: 'O código é obrigatório.' }),
  password: z
    .string(strMessage('senha'))
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
      message:
        'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
    }),
})

export async function resetForgotPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { token, code, password } = bodySchema.parse(request.body)

  const resetForgotPasswordUseCase = makeResetForgotPasswordUseCase()

  await resetForgotPasswordUseCase.execute({
    token,
    code,
    password,
  })

  return reply.status(200).send()
}
