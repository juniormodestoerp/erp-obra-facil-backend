import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'
import { strMessage } from '@core/utils/custom-zod-error'

import { makeSendForgotPasswordCodeUseCase } from '@modules/user/use-cases/factories/make-send-forgot-password-code'

const schema = z
  .object({
    document: z
      .string(strMessage('CPF'))
      .length(11, { message: 'O campo CPF deve conter 11 caracteres.' })
      .regex(/^[0-9]+$/, {
        message: 'O campo CPF deve conter apenas números.',
      })
      .optional(),
    email: z
      .string(strMessage('e-mail'))
      .email('O campo e-mail deve conter um endereço de email válido.')
      .min(1, 'O campo e-mail é obrigatório.')
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.document && data.email) {
      ctx.addIssue({
        path: ['document'],
        message:
          'Apenas o campo CPF ou e-mail deve ser fornecido, mas não ambos.',
        code: 'custom',
      })
    } else if (!data.document && !data.email) {
      ctx.addIssue({
        path: ['document'],
        message: 'Um dos campos, CPF ou e-mail, deve ser fornecido.',
        code: 'custom',
      })
    }
  })

export async function sendForgotPasswordCode(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { document, email } = schema.parse(request.body)

  const sendForgotPasswordCodeUseCase = makeSendForgotPasswordCodeUseCase()

  await sendForgotPasswordCodeUseCase.execute({
    protocol: request.protocol,
    hostname: request.hostname,
    document: document && new Document(document, 'CPF').value,
    email: email && new Email(email).value,
  })

  return reply.status(200).send()
}
