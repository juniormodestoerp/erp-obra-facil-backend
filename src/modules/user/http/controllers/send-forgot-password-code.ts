import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSendForgotPasswordCode } from '@modules/user/use-cases/factories/make-send-forgot-password-code'

import { message } from '@shared/infra/http/utils/zod'

const bodySchema = z.object({
  document: z
    .string(message('documento'))
    .length(11, { message: 'O campo documento deve ter 11 caracteres.' })
    .regex(/^[0-9]+$/, {
      message: 'O campo documento deve conter apenas números.',
    }),
  email: z
    .string(message('email'))
    .email({
      message: 'O email deve ser um endereço de email.',
    })
    .nonempty({
      message: 'O email deve ser um endereço de email válido.',
    }),
})

export async function sendForgotPasswordCode(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { document, email } = bodySchema.parse(request.body)

  const sendForgotPasswordCode = makeSendForgotPasswordCode()

  await sendForgotPasswordCode.execute({
    customer: request.customer,
    document,
    email,
  })

  return reply.status(200).send()
}
