import { FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

export const registerSchema = {
  schema: {
    summary: 'Register user',
    tags: ['users'],
    body: z.object({
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
    }),
    response: {
      200: z.object({
        user: z.object({
          id: z.string(strMessage('id')),
          document: z.string(strMessage('CPF')),
          name: z.string(strMessage('nome')),
          email: z.string(strMessage('e-mail')),
          phone: z.string(strMessage('telefone')),
          role: z.string(strMessage('permissão')),
          createdAt: z.string(strMessage('data de criação')),
          updatedAt: z.string(strMessage('data de atualização')),
          deletedAt: z.string(strMessage('data de exclusão')).optional(),
        }),
        accessToken: z
          .string(strMessage('token de acesso'))
          .uuid({ message: 'O campo id deve ser um UUID válido.' }),
      }),
    },
  },
}

export type RegisterRequest = FastifyRequest<{
  Body: z.infer<typeof registerSchema.schema.body>
}>
