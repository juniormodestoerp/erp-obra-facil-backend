import { FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

export const sendForgotPasswordCodeSchema = {
  schema: {
    summary: 'Send forgot password link',
    tags: ['sessions'],
    body: z
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
      }),
    response: {
      200: z.null(),
    },
  },
}

export type SendForgotPasswordCodeSchemaRequest = FastifyRequest<{
  Body: z.infer<typeof sendForgotPasswordCodeSchema.schema.body>
}>
