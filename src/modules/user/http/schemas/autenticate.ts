import { FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

export const authenticateSchema = {
  schema: {
    summary: 'Authenticate user',
    tags: ['sessions'],
    body: z.object({
      email: z
        .string(strMessage('e-mail'))
        .email('O campo e-mail deve conter um endereço de email válido.')
        .min(1, 'O campo e-mail é obrigatório.'),
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

export type AuthenticateRequest = FastifyRequest<{
  Body: z.infer<typeof authenticateSchema.schema.body>
}>
